import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { db } from "@niceai/db";

const router = new OpenAPIHono();

const tags = ["Space"];

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
    const data = await db.query.spaces.findMany({
      columns: {
        id: true,
        name: true,
      },
    });
    return c.json({
      data,
    });
  },
);

router.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: z.object({
              data: z.object({}).optional(),
            }),
          },
        },
      },
    },
    tags,
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = await db.query.spaces.findFirst({
      where: (spaces, { eq }) => eq(spaces.id, id),
      columns: {
        id: true,
        name: true,
      },
    });
    return c.json({
      data,
    });
  },
);

export default router;
