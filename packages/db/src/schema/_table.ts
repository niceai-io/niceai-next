import { pgTableCreator } from "drizzle-orm/pg-core";
import { snakeCase } from 'lodash-es'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgSqlTable = pgTableCreator((name) => `na_${snakeCase(name)}`)