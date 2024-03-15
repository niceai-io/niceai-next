import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { auth } from "@niceai/auth";
import { db } from "@niceai/db";

const router = new OpenAPIHono();

const tags = ["Users"];

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
              data: z.array(
                z.object({
                  id: z.string(),
                  name: z.string().nullable(),
                  email: z.string(),
                  emailVerified: z.string().nullable(),
                  image: z.string().nullable(),
                }),
              ),
            }),
          },
        },
      },
    },
    tags,
  }),
  async (c) => {
    const data = await db.query.users.findMany();
    return c.json({
      data,
    });
  },
);

router.get("/info", async (c) => {
  const r = await auth();
  console.log(r);
  return c.json({ data: r });
});

export default router;
