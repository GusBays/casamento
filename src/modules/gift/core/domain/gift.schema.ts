import { z } from 'zod'

export const giftSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  price: z.coerce.number().positive(),
  image: z.string().min(1).nullable(),
  quotes: z.number().int().min(1),
  remaining: z.number().int().min(0),
  status: z.enum(['available', 'reserved', 'purchased']).optional(),
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
