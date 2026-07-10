import { z } from 'zod'

export const orderItemSchema = z.object({
  id: z.uuid(),
  order_id: z.uuid(),
  gift_id: z.uuid().nullable(),
  name: z.string().min(1),
  image: z.string().min(1).nullable(),
  quantity: z.number().int().positive(),
  price: z.coerce.number().positive(),
  total: z.coerce.number().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const createOrderItemSchema = orderItemSchema.omit({
  id: true,
  order_id: true,
  total: true,
  created_at: true,
  updated_at: true
})

export type OrderItem = z.infer<typeof orderItemSchema>
export type CreateOrderItemInput = z.infer<typeof createOrderItemSchema>
