import { sql } from "drizzle-orm";
import { index, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { pgSqlTable } from "./_table";

export const spaces = pgSqlTable(
  "space",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }),
    userId: varchar("user_id", { length: 256 }),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  },
  (post) => ({
    nameIndex: index("space_name_idx").on(post.name),
  }),
);

export type ISpace = typeof spaces.$inferSelect;
