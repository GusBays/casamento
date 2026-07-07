'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateCartInput, UpdateCartInput } from '@/modules/cart/core/domain/cart.schema'
import { cartService, type CartService } from '@/modules/cart/core/domain/cart.service'

const CART_TOKEN_COOKIE = 'cart_token'
const CART_TOKEN_MAX_AGE = 60 * 60 * 24 * 30

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

  await createCart({
    guest_email: null,
    status: 'active',
    items: [
      {
        gift_id: null,
        image: null,
        name,
        price,
        quantity: 1
      }
    ]
  })

  redirect(giftId ? `/checkout?gift=${giftId}` : '/checkout')
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

  return service().getByToken(token)
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
