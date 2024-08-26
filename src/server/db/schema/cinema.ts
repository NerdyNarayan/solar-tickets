import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import manager from './manager'
import screen from './screen'

const cinema = pgTable('cinema', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
})
export const cinemaRelations = relations(cinema, ({ many }) => ({
  manager: many(manager),
  screen: many(screen),
}))
export default cinema
