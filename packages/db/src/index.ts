import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schema } from "./schema";
export { pgSqlTable as tableCreator } from "./schemas/_table";

export * from "drizzle-orm";
export const db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
