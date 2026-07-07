import { z } from 'zod'
import { createOrderItemSchema, orderItemSchema, type OrderItem, type CreateOrderItemInput } from './order-item.schema'
import { createOrderPaymentSchema, orderPaymentSchema } from './order-payment.schema'

export const orderSchema = z.object({
  id: z.uuid(),
  guest_email: z.email(),
  guest_name: z.string().nullable(),
  guest_message: z.string().nullable(),
  status: z.enum(['pending', 'paid', 'expired', 'cancelled']),
  total: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const orderWithItemsSchema = orderSchema.extend({
  items: z.array(orderItemSchema),
  payment: orderPaymentSchema
})

export const createOrderSchema = orderSchema.omit({
  id: true,
  total: true,
  created_at: true,
  updated_at: true
})

export const updateOrderSchema = createOrderSchema.partial()

export const createOrderWithItemsSchema = createOrderSchema.extend({
  items: z.array(createOrderItemSchema).min(1),
  payment: createOrderPaymentSchema
})

export type OrderRecord = z.infer<typeof orderSchema>
export type Order = z.infer<typeof orderWithItemsSchema>
export type CreateOrderRecordInput = z.infer<typeof createOrderSchema>
export type CreateOrderInput = z.infer<typeof createOrderWithItemsSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type { CreateOrderItemInput, OrderItem }
