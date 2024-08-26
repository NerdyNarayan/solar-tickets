import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import cinema from './cinema'
import user from './user'

const manager = pgTable('manager', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  cinemaId: varchar('cinema_id', { length: 255 }),
  userId: serial('user_id')
    .notNull()
    .unique()
    .references(() => user.id),
})
export const managerRelation = relations(manager, ({ one, many }) => ({
  user: one(user, {
    fields: [manager.userId],
    references: [user.id],
  }),
  cinema: one(cinema, {
    fields: [manager.cinemaId],
    references: [cinema.id],
  }),
}))

export default manager
