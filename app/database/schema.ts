import { integer, pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    verified: boolean().notNull(),
});

export const sessionsTable = pgTable("sessions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull(),
    token: text('token'),
});

export const sessionsRelations = relations(sessionsTable , ({ one }) => ({
    user: one(usersTable , {
        fields: [sessionsTable.userId],
        references: [usersTable.id]
    })
}))