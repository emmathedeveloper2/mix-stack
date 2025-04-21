import { config } from 'dotenv'

config()

export const {
    NODE_ENV,
    DEV_DATABASE_URL,
    DATABASE_URL,
    COOKIE_SECRET,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    APP_NAME,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env