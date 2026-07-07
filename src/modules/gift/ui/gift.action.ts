'use server'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateGiftInput, UpdateGiftInput } from '@/modules/gift/core/domain/gift.schema'
import { giftService, type GiftService } from '@/modules/gift/core/domain/gift.service'

function service(): GiftService {
  return giftService
}

export function createGift(input: CreateGiftInput) {
  return service().create(input)
}

export function updateGift(id: string, input: UpdateGiftInput) {
  return service().update(id, input)
}

export function getOneGift(id: string) {
  return service().getOne(id)
}

export function getAllGifts() {
  return service().getAll()
}

export function getPaginateGifts(params?: PaginationParams) {
  return service().getPaginate(params)
}

export function deleteGift(id: string) {
  return service().delete(id)
}
