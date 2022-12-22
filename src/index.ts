import Koa from "koa"
import { koaBody } from "koa-body"
import { config } from "./config/config"
import { client } from "./config/database"
import { errorHandler } from "./middlewares/errorHandler"
import { userRouter } from "./routers/userRouter"

const app = new Koa()

app.use(errorHandler())
app.use(koaBody())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

const run = async () => {
  await client.connect()
  app.listen(config.app.port, () => {
    console.log(`Server running on :${config.app.port}`)
  })
}

run()
