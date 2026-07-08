'use server'

import { redirect } from 'next/navigation'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateOrderInput, UpdateOrderInput } from '@/modules/order/core/domain/order.schema'
import { getCurrentCart, clearCurrentCartCookie, updateCart } from '@/modules/cart/ui/cart.action'
import { upsertGuestByEmail } from '@/modules/guest/ui/guest.action'
import { orderService, type OrderService } from '@/modules/order/core/domain/order.service'

function service(): OrderService {
  return orderService
}

export async function createOrder(input: CreateOrderInput) {
  return service().create(input)
}

export async function finishCheckout(formData: FormData) {
  const cart = await getCurrentCart()

  if (!cart || cart.items.length === 0) {
    redirect('/#presentes')
  }

  const guest = await upsertGuestByEmail({
    name: String(formData.get('guest_name') ?? '').trim(),
    email: String(formData.get('guest_email') ?? '').trim(),
    phone: String(formData.get('guest_phone') ?? '').trim() || null
  })
  const order = await service().create({
    guest_id: guest.id,
    order_note: String(formData.get('order_note') ?? '').trim() || null,
    status: 'pending',
    items: cart.items.map((item) => ({
      gift_id: item.gift_id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    payment: {
      provider: 'manual_pix',
      provider_payment_id: null,
      status: 'pending',
      pix_payload: process.env.PIX_QR_CODE ?? process.env.PIX_PAYLOAD ?? process.env.PIX_KEY ?? null,
      pix_qr_code_url: process.env.PIX_QR_CODE_URL ?? null,
      expires_at: null
    }
  })

  await updateCart(cart.id, {
    guest_id: guest.id,
    status: 'converted',
    total: cart.total
  })
  await clearCurrentCartCookie()

  redirect(`/checkout?pedido=${order.id}`)
}

export async function updateOrder(id: string, input: UpdateOrderInput) {
  return service().update(id, input)
}

export async function getOneOrder(id: string) {
  return service().getOne(id)
}

export async function getAllOrders() {
  return service().getAll()
}

export async function getPaginateOrders(params?: PaginationParams) {
  return service().getPaginate(params)
}

export async function deleteOrder(id: string) {
  return service().delete(id)
}
