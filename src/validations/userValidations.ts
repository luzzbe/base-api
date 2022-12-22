import { z } from "zod"
import { getUserByEmail } from "../services/userService"

export const createBodySchema = z.object({
  email: z
    .string()
    .email()
    .refine(async (email) => !(await getUserByEmail(email)), {
      message: "Cette adresse email est déjà utilisée.",
    }),
  name: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
})

export type CreateBody = z.infer<typeof createBodySchema>
