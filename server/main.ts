import express, { Express, Request, Response } from "express";
import config from "./config/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(config.port, () => {
  console.log(`🚀 Up and away on port ${config.port}`);
});
