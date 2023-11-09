import * as jwt from "jsonwebtoken";
import ApiConfig from "../config/ApiConfig";

export class TokenUtils {
  static generateToken(id: string, provider: string) {
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
  }

  static verifyToken(token: string) {
    return token;
  }

  static decodeToken(token: string) {
    return token;
  }
}
