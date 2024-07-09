import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const queryClient = postgres(connectionUrl);

export const db = drizzle(queryClient);