import { pgTable, uuid, varchar, text, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 10 }),
  color: varchar('color', { length: 50 }),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  commands: many(commands),
}))

import { commands } from './commands'
