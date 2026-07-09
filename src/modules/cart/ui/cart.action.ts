'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateCartInput, UpdateCartInput } from '@/modules/cart/core/domain/cart.schema'
import { cartService, type CartService } from '@/modules/cart/core/domain/cart.service'

const CART_TOKEN_COOKIE = 'cart_token'
const CART_TOKEN_MAX_AGE = 60 * 60 * 24 * 30
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function service(): CartService {
  return cartService
}

async function getCartToken() {
  return (await cookies()).get(CART_TOKEN_COOKIE)?.value
}

async function getOrCreateCartToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get(CART_TOKEN_COOKIE)?.value ?? crypto.randomUUID()

  cookieStore.set(CART_TOKEN_COOKIE, token, {
    httpOnly: true,
    maxAge: CART_TOKEN_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  return token
}

export async function createCart(input: Omit<CreateCartInput, 'token'>) {
  const token = await getOrCreateCartToken()

  return service().upsertByToken(token, input)
}

export async function addGiftToCart(formData: FormData) {
  const giftId = String(formData.get('giftId') ?? '')
  const name = String(formData.get('name') ?? '')
  const price = Number(formData.get('price') ?? 0)
  const image = String(formData.get('image') ?? '') || null
  const quantity = Math.max(Number(formData.get('quantity') ?? 1), 1)

  await createCart({
    guest_id: null,
    status: 'active',
    items: [
      {
        gift_id: UUID_PATTERN.test(giftId) ? giftId : null,
        image,
        name,
        price,
        quantity
      }
    ]
  })

  revalidatePath('/')
  revalidatePath('/checkout')
}

export async function removeCartItem(formData: FormData) {
  const token = await getCartToken()
  const itemId = String(formData.get('itemId') ?? '')
  const cart = token ? await service().getByToken(token) : null

  if (!cart || !itemId) return

  await service().removeItem(cart.id, itemId)

  revalidatePath('/')
  revalidatePath('/checkout')
}

export async function updateCartItemQuantity(formData: FormData) {
  const token = await getCartToken()
  const itemId = String(formData.get('itemId') ?? '')
  const quantity = Number(formData.get('quantity') ?? 0)
  const cart = token ? await service().getByToken(token) : null

  if (!cart || !itemId || !Number.isFinite(quantity)) return

  await service().updateItemQuantity(cart.id, itemId, quantity)

  revalidatePath('/')
  revalidatePath('/carrinho')
  revalidatePath('/checkout')
}

export async function updateCart(id: string, input: UpdateCartInput) {
  const token = await getCartToken()
  const cart = token ? await service().getByToken(token) : null

  return service().update(cart?.id ?? id, input)
}

export async function getOneCart(id: string) {
  const token = await getCartToken()
  const cart = token ? await service().getByToken(token) : null

  return cart ?? service().getOne(id)
}

export async function getCurrentCart() {
  const token = await getCartToken()

  if (!token) return null

  const cart = await service().getByToken(token)

  if (cart?.status !== 'active') return null

  return cart
}

export async function clearCurrentCartCookie() {
  ;(await cookies()).delete(CART_TOKEN_COOKIE)
}

export async function getAllCarts() {
  return service().getAll()
}

export async function getPaginateCarts(params?: PaginationParams) {
  return service().getPaginate(params)
}

export async function deleteCart(id: string) {
  const token = await getCartToken()
  const cart = token ? await service().getByToken(token) : null

  return service().delete(cart?.id ?? id)
}
