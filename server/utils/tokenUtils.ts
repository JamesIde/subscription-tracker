import * as jwt from "jsonwebtoken";
import API_CONFIG from "../config/ApiConfig";

export class TokenUtils {
  static generateToken(id: string, provider: string) {
    const token = jwt.sign(
      {
        id,
        provider,
      },
      API_CONFIG.JWT.SECRET!,
      {
        expiresIn: API_CONFIG.JWT.EXPIRES_IN!,
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
