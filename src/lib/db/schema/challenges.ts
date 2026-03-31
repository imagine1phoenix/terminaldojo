import { pgTable, uuid, varchar, text, integer, jsonb } from 'drizzle-orm/pg-core'
import { difficultyEnum } from './commands'

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  instructions: text('instructions'),
  difficulty: difficultyEnum('difficulty').notNull().default('beginner'),
  xpReward: integer('xp_reward').notNull().default(25),
  timeLimitSeconds: integer('time_limit_seconds'),
  category: varchar('category', { length: 100 }).notNull(),
  estimatedTime: varchar('estimated_time', { length: 20 }),
  completionCount: integer('completion_count').notNull().default(0),
  hints: jsonb('hints').$type<string[]>().default([]),
  solutionCommands: jsonb('solution_commands').$type<string[]>().default([]),
  validationRules: jsonb('validation_rules').$type<Record<string, unknown>>(),
  steps: jsonb('steps').$type<string[]>().default([]),
})
