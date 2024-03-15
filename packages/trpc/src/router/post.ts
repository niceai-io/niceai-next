import { z } from "zod";

import { db, desc, eq } from "@niceai/db";
import { schema } from "@niceai/db/schema";
import { CreatePostSchema } from "@niceai/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(() => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return db.query.post.findMany({
      orderBy: desc(schema.post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return db.query.post.findFirst({
        where: eq(schema.post.id, input.id),
      });
    }),

  create: protectedProcedure.input(CreatePostSchema).mutation(({ input }) => {
    return db.insert(schema.post).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ input }) => {
    return db.delete(schema.post).where(eq(schema.post.id, input));
  }),
});
