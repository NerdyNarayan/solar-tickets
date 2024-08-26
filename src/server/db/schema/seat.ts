import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'
import screen, { screenRelation } from './screen'

const seat = pgTable(
  'seat',
  {
    seatId: serial('seat_id').primaryKey(),
    row: integer('row').notNull(),
    column: integer('column').notNull(),
    screenId: serial('cinema_id')
      .notNull()
      .references(() => screen.id),
  },
  (seat) => {
    return {
      seatIndex: uniqueIndex('seat_index').on(
        seat.row,
        seat.column,
        seat.screenId,
      ),
    }
  },
)
export const seatRelation = relations(seat, ({ one }) => ({
  screen: one(screen, {
    fields: [seat.screenId],
    references: [screen.id],
  }),
}))

export default seat
