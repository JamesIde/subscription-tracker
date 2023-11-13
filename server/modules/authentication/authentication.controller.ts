import { NextFunction, Request, Response } from "express";
import {
  IdpSchema,
  RegistrationSchema,
} from "../../common/schemas/registration";
import * as authenticationRepository from "./authentication.repository";
import { AppError } from "../../common/interfaces/AppError";
import { HttpStatus } from "../../common/enum/status";
import { TokenUtils } from "../../utils/tokenUtils";
import { TransformUtils } from "../../utils/transformUtils";
import { UserDto } from "../../common/interfaces/UserDto";
import { LoginSchema } from "../../common/schemas/login";
import { Providers } from "../../common/enum/providers";

/**
 * Better practice would be to extract all this to a service,
 * But for now, the repository pattern is good enough
 */

export async function registration(
  req: Request<{}, {}, RegistrationSchema>,
  res: Response,
  next: NextFunction
) {
  try {
    const existsByEmail =
      await authenticationRepository.checkUserByEmailAddress(req.body.email);
    if (existsByEmail) {
      console.warn(`
         Error - User with email ${req.body.email} already exists.
        `);
      throw new AppError(
        "An error occured registering the user.",
        HttpStatus.BAD_REQUEST,
        req.body
      );
    }

    const newUser = await authenticationRepository.createUser(req.body);

    if (!newUser) {
      console.warn(`
         Error - User with email ${req.body.email} could not be created.
        `);
      throw new AppError(
        "An error occured registering the user.",
        HttpStatus.BAD_REQUEST,
        req.body
      );
    }

    const token = TokenUtils.generateToken(newUser.id, newUser.provider);

    res
      .status(HttpStatus.CREATED)
      .json(TransformUtils.transformUser(newUser satisfies UserDto, token));
  } catch (error) {
    next(error);
  }
}
export async function login(
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, provider } = req.body;
    let user = {} as UserDto;

    const exists =
      await authenticationRepository.checkUserByEmailAndProviderType(
        email,
        provider
      );

    if (!exists) {
      throw new AppError(
        "An error occured validating your identity",
        HttpStatus.NOT_FOUND,
        req.body
      );
    }

    user = (await authenticationRepository.getUserByEmailOnly(
      email
    )) as UserDto;

    const token = TokenUtils.generateToken(user.id, user.provider);
    return res
      .status(HttpStatus.OK)
      .json(TransformUtils.transformUser(user, token));
  } catch (error) {
    next(error);
  }
}

export async function idpUser(
  req: Request<{}, {}, IdpSchema>,
  res: Response,
  next: NextFunction
) {
  const { providerUid, email } = req.body;
  try {
    let token = "";
    const idpUserExists =
      await authenticationRepository.getUserByEmailAndProviderUid(
        email,
        providerUid
      );

    if (idpUserExists) {
      // This is a social login and we have the user object
      token = TokenUtils.generateToken(
        idpUserExists.id,
        idpUserExists.provider
      );

      res
        .status(HttpStatus.OK)
        .json(TransformUtils.transformUser(idpUserExists, token));
    } else {
      // This is a social registration
      const existsByEmail =
        await authenticationRepository.checkUserByEmailAddress(email);

      if (existsByEmail) {
        console.warn(`
           Error - User with email ${email} already exists.
          `);
        throw new AppError(
          "An error occured registering the user.",
          HttpStatus.BAD_REQUEST,
          req.body
        );
      } else {
        const newUser = await authenticationRepository.createUser(req.body);

        if (!newUser) {
          console.warn(`
             Error - User with email ${email} could not be created.
            `);
          throw new AppError(
            "An error occured registering the user.",
            HttpStatus.BAD_REQUEST,
            req.body
          );
        }

        token = TokenUtils.generateToken(newUser.id, newUser.provider);

        res
          .status(HttpStatus.CREATED)
          .json(TransformUtils.transformUser(newUser, token));
      }
    }
  } catch (error) {
    next(error);
  }
}
