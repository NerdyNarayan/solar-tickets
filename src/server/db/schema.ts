// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm'
import {
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`)

export const User = pgTable('user', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated: timestamp('updated_at'),
  image: varchar('image', { length: 256 }).notNull(),
})
export const Admin = pgTable('admin', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated: timestamp('updated_at'),
})
export const Manager = pgTable('manager', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated: timestamp('updated_at'),
})
export const adminRelation = relations(Admin, ({ one }) => ({
  user: one(User, {
    fields: [Admin.id],
    references: [User.id],
  }),
}))

export const managerRelation = relations(Manager, ({ one }) => ({
  user: one(User, {
    fields: [Manager.id],
    references: [User.id],
  }),
}))
