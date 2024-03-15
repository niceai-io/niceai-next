import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

const route = new OpenAPIHono();

const tags = ["Open AI"];

route.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "",
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
    tags,
  }),
  async (c) => {
    return c.json({
      data: [],
    });
  },
);

export default route;
