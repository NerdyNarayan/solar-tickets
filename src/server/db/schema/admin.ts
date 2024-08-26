import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import user from './user'

const admin = pgTable('admin', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  userId: serial('user_id')
    .notNull()
    .references(() => user.id)
    .unique(),
})
export const adminRelation = relations(admin, ({ one }) => ({
  user: one(user, {
    fields: [admin.userId],
    references: [user.id],
  }),
}))
export default admin
