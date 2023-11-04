import dotenv from "dotenv";
import { Stages } from "../enum/stages";

dotenv.config();

const API_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || Stages.Development,
  RATE_LIMITER: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
};
export const isDevelopment = API_CONFIG.NODE_ENV === Stages.Development;

export default API_CONFIG;
