import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import cinema from './cinema'
import seat from './seat'
export const projectionType = pgEnum('projection', [
  'STANDARD',
  'IMAX',
  'DOLBY_CINEMA',
  'IMAX_3D',
])
export const SoundSystemType = pgEnum('SoundSystem', [
  'MONO',
  'STEREO',
  'DOLBY_ATMOS',
  'DOLBY_DIGITAL',
  'DTS',
  'IMAX_ENHANCED',
])
const screen = pgTable('screen', {
  id: serial('screen_id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  screenNumber: integer('screen_number').notNull().unique(),
  cinemaId: serial('cinema_id')
    .notNull()
    .references(() => cinema.id),
  projectionType: projectionType('projection'),
  SoundSystemType: SoundSystemType('SoundSystem'),
  price: real('price').default(200.0),
})
export const screenRelation = relations(screen, ({ one, many }) => ({
  cinema: one(cinema, {
    fields: [screen.cinemaId],
    references: [cinema.id],
  }),
  seats: many(seat),
}))
export default screen
