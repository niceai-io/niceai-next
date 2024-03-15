import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { db } from "@niceai/db";

const router = new OpenAPIHono();

const tags = ["Plugins"];

router.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: z.object({
              data: z.array(z.object({})),
            }),
          },
        },
      },
    },
    tags,
  }),
  async (c) => {
    const data = await db.query.plugins.findMany();
    return c.json({
      data,
    });
  },
);

export default router;
