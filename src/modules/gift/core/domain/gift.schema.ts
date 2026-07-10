import { z } from '@/lib/zod'

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

export const giftFormSchema = createGiftSchema.extend({
  id: z.union([z.literal('new'), z.uuid()]),
  image: z
    .string()
    .trim()
    .optional()
    .transform(value => value || null)
})

export type Gift = z.infer<typeof giftSchema>
export type CreateGiftInput = z.infer<typeof createGiftSchema>
export type UpdateGiftInput = z.infer<typeof updateGiftSchema>
export type GiftFormInput = z.input<typeof giftFormSchema>
export type GiftFormOutput = z.output<typeof giftFormSchema>
