import { z } from 'zod'

export const cartSchema = z.object({
  id: z.uuid(),
  token: z.string().min(1),
  guest_id: z.uuid().nullable(),
  order_id: z.uuid().nullable().optional(),
  status: z.enum(['active', 'converted', 'abandoned']),
  total: z.number().int().min(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const cartItemSchema = z.object({
  id: z.uuid(),
  cart_id: z.uuid(),
  gift_id: z.uuid().nullable(),
  gift: z.object({
    remaining: z.number().int().min(0),
    quotes: z.number().int().min(1),
    status: z.enum(['available', 'reserved', 'purchased']).optional()
  }).nullable().optional(),
  name: z.string().min(1),
  image: z.string().min(1).nullable(),
  quantity: z.number().int().positive(),
  price: z.number().int().positive(),
  total: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const cartWithItemsSchema = cartSchema.extend({
  items: z.array(cartItemSchema)
})

export const createCartSchema = cartSchema.omit({
  id: true,
  total: true,
  created_at: true,
  updated_at: true
})

export const updateCartSchema = cartSchema
  .omit({
    id: true,
    token: true,
    created_at: true,
    updated_at: true
  })
  .partial()

export const createCartItemSchema = cartItemSchema.omit({
  id: true,
  cart_id: true,
  total: true,
  created_at: true,
  updated_at: true
})

export const createCartWithItemsSchema = createCartSchema.extend({
  items: z.array(createCartItemSchema).min(1)
})

export type CartRecord = z.infer<typeof cartSchema>
export type Cart = z.infer<typeof cartWithItemsSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type CreateCartRecordInput = z.infer<typeof createCartSchema>
export type CreateCartInput = z.infer<typeof createCartWithItemsSchema>
export type UpdateCartInput = z.infer<typeof updateCartSchema>
export type CreateCartItemInput = z.infer<typeof createCartItemSchema>
