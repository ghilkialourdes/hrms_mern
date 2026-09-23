import dotenv from "dotenv";
console.log(`Loading environment variables from .env.${process.env.NODE_ENV}`);
dotenv.config({ path: `./Environment/.env.${process.env.NODE_ENV || "local"}` });

// console.log(`Environment variables loaded: ${JSON.stringify(process.env, null, 2)}`);

export const config = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/hrms",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h"
};