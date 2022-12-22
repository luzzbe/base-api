import { Context } from "koa"
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../services/userService"
import { CreateBody } from "../validations/userValidations"

export const getAll = async (ctx: Context) => {
  const users = await getUsers()
  ctx.body = { users }
}

export const getOne = async (ctx: Context) => {
  const user = await getUser(ctx.params.id)
  ctx.body = { user }
}

export const remove = async (ctx: Context) => {
  const result = await deleteUser(ctx.params.id)
  if (result.deletedCount === 0) ctx.throw(404, "User not found")
  ctx.status = 204
}

export const create = async (ctx: Context) => {
  const user = ctx.request.body as CreateBody
  // Create the user
  const result = await createUser(user)
  // Return the result
  ctx.body = await getUser(result.insertedId.toString())
}
