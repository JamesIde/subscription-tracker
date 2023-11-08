import { NextFunction, Request, Response } from "express";
import { RegistrationSchema } from "../../common/schemas/registration";
import * as authenticationRepository from "./authentication.repository";
import { AppError } from "../../common/interfaces/AppError";
import { HttpStatus } from "../../common/enum/status";
import { TokenUtils } from "../../utils/tokenUtils";
import { TransformUtils } from "../../utils/transformUtils";
import { UserDto } from "../../common/interfaces/UserDTO";

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
    if (req.body.providerId) {
      // This is a social user registration.UI will handle the logic to call correct path (reg/log)
      // as Firebase only has a 'SignIn' event, not 'Register' for social users
      const existsByProviderId =
        await authenticationRepository.checkUserByProviderId(
          req.body.providerId
        );
      if (existsByProviderId) {
        console.warn(`
         Error - User with providerId ${req.body.providerId} already exists.
        `);
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
