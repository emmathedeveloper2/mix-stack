import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as process from "node:process";

const url = process.env.NODE_ENV == "development" ? process.env.DEV_DATABASE_URL! : process.env.DATABASE_URL!

export default defineConfig({
    out: './drizzle',
    schema: './app/database/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url,
    },
});
