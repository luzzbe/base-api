import { Context, Next } from "koa"
import { ZodError } from "zod"

/**
 * Error handler middleware
 */
export const errorHandler = () => {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        const status = 422
        ctx.status = status
        ctx.body = {
          error: "Validation error",
          issues: err.flatten(),
        }
      } else {
        const status = err.status || 500
        ctx.status = status
        ctx.body = { error: err.message }
      }
    }
  }
}
