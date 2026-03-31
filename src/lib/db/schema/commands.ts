import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { categories } from './categories'

export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced'])
export const dangerLevelEnum = pgEnum('danger_level', ['safe', 'caution', 'dangerous'])

export const commands = pgTable('commands', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  shortDescription: varchar('short_description', { length: 255 }).notNull(),
  fullDescription: text('full_description'),
  syntaxTemplate: varchar('syntax_template', { length: 500 }),
  difficulty: difficultyEnum('difficulty').notNull().default('beginner'),
  dangerLevel: dangerLevelEnum('danger_level').notNull().default('safe'),
  isPublished: boolean('is_published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const commandsRelations = relations(commands, ({ one, many }) => ({
  category: one(categories, {
    fields: [commands.categoryId],
    references: [categories.id],
  }),
  flags: many(commandFlags),
  examples: many(commandExamples),
}))

export const commandFlags = pgTable('command_flags', {
  id: uuid('id').primaryKey().defaultRandom(),
  commandId: uuid('command_id').notNull().references(() => commands.id, { onDelete: 'cascade' }),
  flag: varchar('flag', { length: 100 }).notNull(),
  description: text('description').notNull(),
  example: text('example'),
  isCommon: boolean('is_common').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const commandFlagsRelations = relations(commandFlags, ({ one }) => ({
  command: one(commands, {
    fields: [commandFlags.commandId],
    references: [commands.id],
  }),
}))

export const commandExamples = pgTable('command_examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  commandId: uuid('command_id').notNull().references(() => commands.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }),
  commandText: text('command_text').notNull(),
  explanation: text('explanation').notNull(),
  expectedOutput: text('expected_output'),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const commandExamplesRelations = relations(commandExamples, ({ one }) => ({
  command: one(commands, {
    fields: [commandExamples.commandId],
    references: [commands.id],
  }),
}))
