
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, json, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  phone: varchar('phone').notNull().default(''),
  username: varchar('username').notNull().default(''),
  role_id: integer('role_id').notNull().references(() => roles.role_id),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
  });

export const roles = pgTable('roles', {
    role_id: serial('role_id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),  
});

export const user_logs = pgTable('user_logs', {
  user_log_id: uuid('user_log_id').primaryKey().defaultRandom(),
  device: json('device').notNull(),
  version: varchar('version', { length: 255 }).notNull(),
  activity: varchar('activity', { length: 255 }).notNull(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  note: varchar('note', { length: 255 }).notNull(),
});

export const master_data = pgTable('master_data', {
  id: uuid('id').primaryKey(),
  data : json('data').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),  
});

export type MasterData = InferSelectModel<typeof master_data>;
export type NewMasterData = InferInsertModel<typeof master_data>;

export type UserLog = InferSelectModel <typeof user_logs>
export type NewUserLog = InferInsertModel <typeof user_logs>
  
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Role = InferSelectModel<typeof roles>;
export type NewRole = InferInsertModel<typeof roles>;
