import { NextFunction, Request, Response } from "express";
import { RegistrationSchema } from "../../common/schemas/registration";
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
    if (req.body.providerUid) {
      // This is a social user registration.UI will handle the logic to call correct path (reg/log)
      // as Firebase only has a 'SignIn' event, not 'Register' for social users
      const existsByProviderUid =
        await authenticationRepository.checkUserByProviderUid(
          req.body.providerUid
        );
      if (existsByProviderUid) {
        console.log(
          `Error - User with providerId ${req.body.providerUid} already exists.`
        );
        throw new AppError(
          "An error occured registering the user.",
          HttpStatus.BAD_REQUEST,
          req.body
        );
      }
    }

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
    const { emailAddress, provider, providerId } = req.body;

    let user = {} as UserDto;

    if (provider === Providers.EMAIL_PASSWORD) {
      const exists =
        await authenticationRepository.checkUserByEmailAndProviderType(
          emailAddress,
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
        emailAddress
      )) as UserDto;
    } else {
      // Social login - provider Id must be present
      if (!providerId) {
        throw new AppError(
          "An error occured validating your identity",
          HttpStatus.BAD_REQUEST,
          req.body
        );
      }

      user = (await authenticationRepository.getUserByEmailAndProviderUid(
        emailAddress,
        providerId
      )) as UserDto;
    }

    const token = TokenUtils.generateToken(user.id, user.provider);
    return res
      .status(HttpStatus.OK)
      .json(TransformUtils.transformUser(user, token));
  } catch (error) {
    next(error);
  }
}
