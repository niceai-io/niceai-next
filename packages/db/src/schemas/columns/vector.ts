import { customType } from "drizzle-orm/pg-core";

export const vector = customType<{
  data: number[];
  driverData: string;
  config: { size: number };
}>({
  dataType: (config?: { size: number }) =>
    !!config && typeof config.size === "number"
      ? `vector(${config.size})`
      : "vector",
  fromDriver: (value: string) => JSON.parse(value) as number[],
  toDriver: (value: unknown) => JSON.stringify(value),
});
