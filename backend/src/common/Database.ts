import mongoose from "mongoose";
import { logger } from "./Logger";

export async function connectToDb() {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    auth: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    authSource: 'admin'
  })
  logger.info(`Connection to Database established`)
}

export async function disconnectFromDb() {
  await mongoose.disconnect()
  logger.info(`Disconnected from database`)
}