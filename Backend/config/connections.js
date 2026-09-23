import mongoose from "mongoose";
import { config } from "./index.js";

export const dbConnect = (URI) => {
    mongoose
        .connect(URI)
        .then(() => {
            console.log("Successfully connected to database, DB_URI : ", URI);
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            // process.exit(1);
            // dbConnect(config.DB_URI);
        });
}