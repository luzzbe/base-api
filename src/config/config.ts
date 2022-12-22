import dotenv from "dotenv"
import { str } from "./helpers"
dotenv.config()

export const config = {
  app: {
    port: str(process.env.APP_PORT, "APP_PORT"),
    database: str(process.env.MONGO_URL, "MONGO_URL"),
  },
}
