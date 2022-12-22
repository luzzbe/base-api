import { Context, Next } from "koa"
import { z, AnyZodObject } from "zod"

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  let message
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      message = `Le champ doit contenir au moins ${issue.minimum} caractère(s).`
      break
    case z.ZodIssueCode.too_big:
      message = `Le champ peut contenir au maximum ${issue.maximum} caractère(s).`
      break
    case z.ZodIssueCode.unrecognized_keys:
      if (issue.keys.length > 1) {
        message = `Les champs ${issue.keys} n'existent pas.`
      } else {
        message = `Le champ ${issue.keys} n'existe pas.`
      }
      break
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        message = `Le champ doit être une adresse email valide.`
      } else {
        message = ctx.defaultError
      }
      break
    default:
      message = ctx.defaultError
  }

  return { message }
}

z.setErrorMap(customErrorMap)

/**
 * Validate middleware
 * @param schema Zod schema to validate
 */
export const validate = (schema: AnyZodObject) => {
  return async (ctx: Context, next: Next) => {
    await schema.strict().parseAsync(ctx.request.body)
    await next()
  }
}
