import { z } from '@/lib/zod'

export const orderPaymentSchema = z.object({
  id: z.uuid(),
  order_id: z.uuid(),
  provider: z.string().min(1),
  provider_payment_id: z.string().nullable(),
  status: z.enum(['pending', 'paid', 'expired', 'failed', 'refunded']),
  pix_payload: z.string().nullable(),
  pix_qr_code_url: z.string().nullable(),
  expires_at: z.string().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
})

export const createOrderPaymentSchema = orderPaymentSchema.omit({
  id: true,
  order_id: true,
  created_at: true,
  updated_at: true
})

export const updateOrderPaymentSchema = createOrderPaymentSchema.partial()

export type OrderPayment = z.infer<typeof orderPaymentSchema>
export type CreateOrderPaymentInput = z.infer<typeof createOrderPaymentSchema>
export type UpdateOrderPaymentInput = z.infer<typeof updateOrderPaymentSchema>
