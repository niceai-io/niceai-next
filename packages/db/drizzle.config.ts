import type { Config } from "drizzle-kit";

const uri = process.env.DATABASE_URL!;

export default {
  schema: "./src/schemas",
  driver: "pg",
  dbCredentials: { connectionString: uri },
  tablesFilter: ["na_*"],
} satisfies Config;
