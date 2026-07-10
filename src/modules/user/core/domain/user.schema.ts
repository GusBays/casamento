import { z } from '@/lib/zod'

export const userSchema = z.object({
  id: z.uuid(),
  username: z.string().min(1),
  password: z.string().min(1),
  token: z.string().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const loginFormSchema = userSchema.pick({
  username: true,
  password: true
})

export type User = z.infer<typeof userSchema>
export type LoginFormInput = z.input<typeof loginFormSchema>
