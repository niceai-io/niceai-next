import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger as loggerMiddleware } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import { logger } from "./logger";

import apps from "./routes/app";
import bot from "./routes/bot";
import explores from "./routes/explore";
import openai from "./routes/openai";
import plugins from "./routes/plugin";
import space from "./routes/space";
import users from "./routes/user";

export function createApp({
  prefix = "/",
}: { prefix?: string } = {}): OpenAPIHono {
  const app = new OpenAPIHono().basePath(prefix);

  app.get("swagger", swaggerUI({ url: `${prefix}/openapi` }));

  /**
   * Default route when no other route matches.
   * Returns a JSON response with a message and status code 404.
   */
  app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));
  app.use("*", async (c, next) => {
    logger.info(`Request: ${c.req.url}`);
    await next();
  });

  /**
   * Global error handler.
   * If error is instance of HTTPException, returns the custom response.
   * Otherwise, logs the error and returns a JSON response with status code 500.
   */
  app.onError((err, c) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    c.status(500);
    return c.json({ status: "failure", message: err.message });
  });

  app.use("*", cors(), compress(), timing(), loggerMiddleware(), prettyJSON());

  app.openapi(
    createRoute({
      path: "/",
      method: "get",
      responses: {
        200: {
          description: "Respond a message",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      tags: ["Default"],
    }),
    (c) => {
      return c.json({
        message: "hello nice ai.",
      });
    },
  );

  app.route("/users", users);
  app.route("/openai", openai);
  app.route("/plugins", plugins);
  app.route("/apps", apps);
  app.route("/spaces", space);
  app.route("/bots", bot);
  app.route("/explores", explores);

  app.doc31("openapi", (c) => {
    const url = new URL(c.req.url);
    url.pathname = prefix;
    return {
      info: {
        title: "Nice AI API",
        version: "v1",
      },
      openapi: "3.1.0",
      servers: [
        {
          url: url.toString(),
          description: "Nice Ai API.",
        },
      ],
      tags: [
        {
          name: "Default",
          description: "Default",
        },
        {
          name: "Users",
          description: "Users",
        },
        {
          name: "Posts",
          description: "Posts",
        },
        {
          name: "OpenAI",
          description: "OpenAI",
        },
      ],
    };
  });
  return app;
}
