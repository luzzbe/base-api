import { MongoClient } from "mongodb"
import { config } from "./config"

export const client = new MongoClient(config.app.database)
export const db = client.db()
