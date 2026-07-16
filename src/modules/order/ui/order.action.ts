'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createPixPayload } from '@/lib/pix'
import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import {
  clearCurrentCartCookie,
  getCurrentCart,
  updateCart
} from '@/modules/cart/ui/cart.action'
import type {
  CreateOrderInput,
  UpdateOrderInput
} from '@/modules/order/core/domain/order.schema'
import {
  orderService,
  type OrderService
} from '@/modules/order/core/domain/order.service'
import { requireUser } from '@/modules/user/core/domain/user.service'

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

  const guestName = String(formData.get('guest_name') ?? '').trim()
  const message = String(formData.get('note') ?? '').trim()
  const note = [guestName ? `Presente de: ${guestName}` : null, message || null]
    .filter(Boolean)
    .join('\n\n') || null

  const order = await service().create({
    guest_id: null,
    cart_id: cart.id,
    note,
    status: 'pending',
    items: cart.items.map(item => ({
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
      pix_payload: null,
      pix_qr_code_url: process.env.PIX_QR_CODE_URL ?? null,
      expires_at: null
    }
  })

  const pixKey = process.env.PIX_KEY ?? process.env.NEXT_PUBLIC_PIX_KEY
  const receiverName = process.env.PIX_RECEIVER_NAME
  const receiverCity = process.env.PIX_RECEIVER_CITY

  if (pixKey && receiverName && receiverCity) {
    await service().updatePaymentForOrder(order.id, {
      pix_payload: createPixPayload({
        key: pixKey,
        receiverName,
        receiverCity,
        amountCents: Math.round(cart.total * 100),
        txid: order.id
      })
    })
  }

  await updateCart(cart.id, {
    guest_id: null,
    order_id: order.id,
    status: 'converted',
    total: cart.total
  })
  await clearCurrentCartCookie()

  redirect(`/order/${order.id}`)
}

export async function confirmOrderPayment(formData: FormData) {
  const orderId = String(formData.get('orderId') ?? '')

  if (!orderId) return

  await service().confirmManualPayment(orderId)
  revalidatePath('/')
  revalidatePath(`/order/${orderId}`)
  redirect(`/order/${orderId}`)
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

export async function markOrderAsPaid(formData: FormData) {
  await requireUser()

  const orderId = String(formData.get('orderId') ?? '')

  if (!orderId) return

  await service().confirmManualPayment(orderId)
  revalidatePath('/admin/orders')
  revalidatePath(`/order/${orderId}`)
}
