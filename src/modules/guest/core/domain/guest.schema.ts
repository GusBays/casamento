import { z } from '@/lib/zod'

export const guestSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const createGuestSchema = guestSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
})

export const updateGuestSchema = createGuestSchema.partial()

export type Guest = z.infer<typeof guestSchema>
export type CreateGuestInput = z.infer<typeof createGuestSchema>
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>
