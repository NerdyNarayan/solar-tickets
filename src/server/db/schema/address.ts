import { relations } from 'drizzle-orm'
import {
  decimal,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import cinema from './cinema'

const address = pgTable('address', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  address: varchar('address_line_1', { length: 255 }).notNull(),
  lat: decimal('lat').notNull(),
  lng: decimal('lng').notNull(),
  cinemaId: serial('cinema_id')
    .notNull()
    .references(() => cinema.id)
    .unique(),
})
export const addressRelation = relations(address, ({ one }) => ({
  cinema: one(cinema, { fields: [address.cinemaId], references: [cinema.id] }),
}))
export default address
