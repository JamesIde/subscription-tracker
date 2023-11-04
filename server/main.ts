import express from "express";
import API_CONFIG from "./config/ApiConfig";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

app.get("/api/v1/heartbeat", (req, res) => {
  res.json({
    ok: true,
  });
});

app.use(helmet());
app.use(rateLimit(API_CONFIG.RATE_LIMITER));
app.use(express.json());

app.listen(API_CONFIG.PORT, () => {
  console.log(
    `🚀 Listening on ${API_CONFIG.PORT} and environment is ${API_CONFIG.PORT}`
  );
});
