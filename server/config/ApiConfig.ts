import dotenv from "dotenv";
import { Stages } from "../common/enum/stages";

dotenv.config();

export const isDevelopment = process.env.NODE_ENV === Stages.Development;

const API_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || Stages.Development,
  RATE_LIMITER: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
  DATABASE_URL: isDevelopment ? "" : "", // Can't use this inside prisma schema TODO investigate
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};

export default API_CONFIG;
