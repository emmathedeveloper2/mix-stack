import { drizzle } from 'drizzle-orm/node-postgres';
import {DATABASE_URL, DEV_DATABASE_URL, NODE_ENV} from "~/.server/config/env.config";

const initializeDatabase = () => {
    return NODE_ENV == "development" ? drizzle(DEV_DATABASE_URL!) : drizzle(DATABASE_URL!)
}

const db = initializeDatabase();

export default db

