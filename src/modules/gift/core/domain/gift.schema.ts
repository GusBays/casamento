import { z } from 'zod'

export const giftSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  price: z.number().int().positive(),
  image: z.url().nullable(),
  quotes: z.number().int().min(1),
  remaining: z.number().int().min(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const createGiftSchema = giftSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
})

export const updateGiftSchema = createGiftSchema.partial()

export type Gift = z.infer<typeof giftSchema>
export type CreateGiftInput = z.infer<typeof createGiftSchema>
export type UpdateGiftInput = z.infer<typeof updateGiftSchema>
