import { createConfig } from "express-zod-api";
import createHttpError from "http-errors";
import logger from "./logger";
import ui from "swagger-ui-express";
import path from "node:path";
import fs, { readFileSync } from "node:fs";
import YAML from "yaml";

const config = createConfig({
  server: {
    listen: 8090,
    compression: {
      chunkSize: 1024,
      level: 6,
      memLevel: 8,
      strategy: 0,
      threshold: 1024,
    },
    upload: {
      limits: { fileSize: 51200 }, // 50 KB
      limitError: createHttpError(413, "The file is too large"), // handled by errorHandler in config
      debug: false,
      createParentPath: false,
      uriDecodeFileNames: false,
      safeFileNames: false,
      preserveExtension: false,
      useTempFiles: false,
      tempFileDir: "/tmp",
      uploadTimeout: 60000,
    },
    beforeRouting: async ({ app, logger, getChildLogger }) => {
      const documentation = YAML.parse(
        readFileSync(path.join(__dirname, "swagger.yaml"), "utf-8"),
      );
      app.use("/docs", ui.serve, ui.setup(documentation));
    },
  },
  cors: true,
  logger: logger,
});

export default config;
