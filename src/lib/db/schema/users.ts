import { pgTable, uuid, varchar, text, timestamp, integer, boolean, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'pro', 'team'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  level: integer('level').notNull().default(1),
  totalXp: integer('total_xp').notNull().default(0),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  subscriptionTier: subscriptionTierEnum('subscription_tier').notNull().default('free'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastActiveAt: timestamp('last_active_at').notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  commandProgress: many(userCommandProgress),
  challengeProgress: many(userChallengeProgress),
  badges: many(userBadges),
  dailyActivity: many(userDailyActivity),
}))

// Forward references — imported from other schema files
import { userCommandProgress, userChallengeProgress, userDailyActivity } from './progress'
import { userBadges } from './badges'
