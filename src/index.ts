import { BuiltinLogger, createServer } from "express-zod-api";
import { Logger } from "pino";
import config from "./config";
import routing from "./routing";

// Setting the type of logger used
declare module "express-zod-api" {
  interface LoggerOverrides extends Logger, BuiltinLogger {}
}

createServer(config, routing);
