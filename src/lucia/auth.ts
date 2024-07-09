import { db } from "@/drizzle/drizzle";
import { sessions, users } from "@/drizzle/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users); 

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name : "session",
		expires: true,
		attributes: {
			secure: process.env.NODE_ENV === "development"
		}
	},
	getSessionAttributes : (users) => {
		return {
			role_id : users.role_id
		}
	},
	sessionExpiresIn : new TimeSpan(30, "d"),

});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: {
			role_id : number,
		};
	}
	
}