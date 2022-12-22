import Router from "koa-router"
import { create, getAll, getOne, remove } from "../controllers/userController"
import { validate } from "../middlewares/validate"
import { createBodySchema } from "../validations/userValidations"

const userRouter = new Router({ prefix: "/users" })

userRouter.get("/", getAll)
userRouter.post("/", validate(createBodySchema), create)
userRouter.get("/:id", getOne)
userRouter.delete("/:id", remove)

export { userRouter }
