import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import manager from './manager'

const user = pgTable('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  externalId: varchar('external_id', { length: 255 }).notNull().unique(),
})
export const userRelation = relations(user, ({ one }) => ({}))
export default user
