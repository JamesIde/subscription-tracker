import express from "express";
import ApiConfig from "./config/ApiConfig";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler";
import { validateRequest } from "./middlewares/requestValidator";
import { TestSchema } from "./common/schemas/test";
import cors from "cors";
import authRouter from "./modules/authentication/authentication.router";
const app = express();

app.use(helmet());
app.use(rateLimit(ApiConfig.RATE_LIMITER));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
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
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
app.listen(ApiConfig.PORT, () => {
  console.log(
    `🚀 Listening on ${ApiConfig.PORT} and environment is ${ApiConfig.PORT}`
  );
});
