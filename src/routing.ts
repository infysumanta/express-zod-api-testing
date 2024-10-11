import { defaultEndpointsFactory, Middleware, Routing } from "express-zod-api";
import { z } from "zod";

const helloWorldEndpoint = defaultEndpointsFactory
  .addMiddleware(
    new Middleware({
      input: z.object({}),
      handler: async ({ logger }) => {
        return logger.debug("Middleware 1");
      },
    }),
  )
  .build({
    method: "get",
    tags: ["Hello", "users"],
    input: z.object({
      name: z.string().optional(),
    }),
    output: z.object({
      greetings: z.string(),
    }),

    handler: async ({ input: { name }, options, logger }) => {
      logger.debug("Options:", options); // middlewares provide options
      return { greetings: `Hello, ${name || "World"}. Happy coding!` };
    },
  });

const routing: Routing = {
  v1: {
    hello: helloWorldEndpoint,
  },
};

export default routing;
