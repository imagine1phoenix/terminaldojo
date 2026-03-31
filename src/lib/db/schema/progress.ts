import { pgTable, uuid, integer, timestamp, varchar, pgEnum, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { commands } from './commands'
import { challenges } from './challenges'

export const commandStatusEnum = pgEnum('command_status', ['not_started', 'in_progress', 'completed'])
export const challengeStatusEnum = pgEnum('challenge_status', ['not_started', 'attempted', 'completed'])

export const userCommandProgress = pgTable('user_command_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  commandId: uuid('command_id').notNull().references(() => commands.id, { onDelete: 'cascade' }),
  status: commandStatusEnum('status').notNull().default('not_started'),
  xpEarned: integer('xp_earned').notNull().default(0),
  completedAt: timestamp('completed_at'),
})

export const userCommandProgressRelations = relations(userCommandProgress, ({ one }) => ({
  user: one(users, { fields: [userCommandProgress.userId], references: [users.id] }),
  command: one(commands, { fields: [userCommandProgress.commandId], references: [commands.id] }),
}))

export const userChallengeProgress = pgTable('user_challenge_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  challengeId: uuid('challenge_id').notNull().references(() => challenges.id, { onDelete: 'cascade' }),
  status: challengeStatusEnum('status').notNull().default('not_started'),
  attempts: integer('attempts').notNull().default(0),
  bestTimeSeconds: integer('best_time_seconds'),
  xpEarned: integer('xp_earned').notNull().default(0),
  completedAt: timestamp('completed_at'),
})

export const userChallengeProgressRelations = relations(userChallengeProgress, ({ one }) => ({
  user: one(users, { fields: [userChallengeProgress.userId], references: [users.id] }),
  challenge: one(challenges, { fields: [userChallengeProgress.challengeId], references: [challenges.id] }),
}))

export const userDailyActivity = pgTable('user_daily_activity', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: varchar('date', { length: 10 }).notNull(),
  commandsPracticed: integer('commands_practiced').notNull().default(0),
  challengesCompleted: integer('challenges_completed').notNull().default(0),
  xpEarned: integer('xp_earned').notNull().default(0),
})

export const userDailyActivityRelations = relations(userDailyActivity, ({ one }) => ({
  user: one(users, { fields: [userDailyActivity.userId], references: [users.id] }),
}))
