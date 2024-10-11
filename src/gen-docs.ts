import { Documentation } from "express-zod-api";
import { writeFile } from "node:fs/promises";
import routing from "./routing";
import config from "./config";
import manifest from "../package.json";
(async () => {
  await writeFile(
    "src/swagger.yaml",
    new Documentation({
      routing,
      config,
      version: manifest.version,
      title: "Express Zod API",
      serverUrl: "https://example.com",
      hasSummaryFromDescription: true,
    }).getSpecAsYaml(),
    "utf-8",
  );
})();
