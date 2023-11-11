import * as jwt from "jsonwebtoken";
import ApiConfig from "../config/ApiConfig";
import { AppError } from "../common/interfaces/AppError";
import { HttpStatus } from "../common/enum/status";
import { DecodedToken } from "../common/interfaces/Token";

export class TokenUtils {
  /**
   * Generates a JWT token
   * @param id
   * @param provider
   * @returns jwt token
   */
  static generateToken(id: string, provider: string) {
    try {
      const token = jwt.sign(
        {
          id,
          provider,
        },
        ApiConfig.JWT.SECRET!,
        {
          expiresIn: ApiConfig.JWT.EXPIRES_IN!,
        }
      );
      return token;
    } catch (error) {
      throw new AppError(
        "An error occured validating your identity",
        HttpStatus.UNAUTHORIZED,
        error
      );
    }
  }

  /**
   * Verifies and decodes a JWT token
   * @param token
   * @returns decoded token
   */
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, ApiConfig.JWT.SECRET!);
      return decoded as DecodedToken;
    } catch (error) {
      throw new AppError(
        "An error occured validating your identity",
        HttpStatus.UNAUTHORIZED,
        error
      );
    }
  }
}
