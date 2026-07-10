'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import {
  giftFormSchema,
  type CreateGiftInput,
  type UpdateGiftInput
} from '@/modules/gift/core/domain/gift.schema'
import { giftService, type GiftService } from '@/modules/gift/core/domain/gift.service'
import { requireUser } from '@/modules/user/core/domain/user.service'

function service(): GiftService {
  return giftService
}

export async function createGift(input: CreateGiftInput) {
  return service().create(input)
}

export async function updateGift(id: string, input: UpdateGiftInput) {
  return service().update(id, input)
}

export async function getOneGift(id: string) {
  return service().getOne(id)
}

export async function getAllGifts() {
  return service().getAll()
}

export async function getPaginateGifts(params?: PaginationParams) {
  return service().getPaginate(params)
}

export async function deleteGift(id: string) {
  return service().delete(id)
}

export async function deleteGiftAdminAction(formData: FormData) {
  await requireUser()

  const giftId = String(formData.get('giftId') ?? '')

  if (!giftId) return

  await service().delete(giftId)
  revalidatePath('/admin/presents')
  redirect('/admin/presents')
}

export async function saveGiftAction(input: unknown) {
  await requireUser()

  const parsed = giftFormSchema.parse(input)
  const { id, ...giftInput } = parsed

  if (id === 'new') {
    await createGift(giftInput)
    revalidatePath('/admin/presents')
    redirect('/admin/presents?notice=gift-created')
  }

  await updateGift(id, giftInput)
  revalidatePath('/admin/presents')
  revalidatePath(`/admin/presents/${id}`)
  redirect('/admin/presents?notice=gift-updated')
}
