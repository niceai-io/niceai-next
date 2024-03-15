import { sql } from "drizzle-orm";
import { index, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { pgSqlTable } from "./_table";

export const apps = pgSqlTable(
  "app",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    intro: varchar("intro", { length: 256 }).default(""),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  },
  (plugin) => ({
    nameIndex: index("app_name_idx").on(plugin.name),
  }),
);
