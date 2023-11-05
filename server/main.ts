import express from "express";
import API_CONFIG from "./config/ApiConfig";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { AppError } from "./common/interfaces/AppError";
import { HttpStatus } from "./common/enum/status";
import { errorHandler } from "./middlewares/errorHandler";
import { validateRequest } from "./middlewares/requestValidator";
import { TestSchema } from "./common/schemas/test";

const app = express();

app.use(helmet());
app.use(rateLimit(API_CONFIG.RATE_LIMITER));
app.use(express.json());

app.post(
  "/api/v1/heartbeat",
  validateRequest({
    body: TestSchema,
  }),
  (req, res) => {
    res.json({
      ok: true,
    });
  }
);

app.use(errorHandler);
app.listen(API_CONFIG.PORT, () => {
  console.log(
    `🚀 Listening on ${API_CONFIG.PORT} and environment is ${API_CONFIG.PORT}`
  );
});
