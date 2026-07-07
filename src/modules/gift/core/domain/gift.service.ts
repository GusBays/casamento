import { BaseService } from '@/lib/base.service'
import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import { GiftRepositorySupabase } from '@/modules/gift/core/infra/repositories/gift.repository.supabase'
import {
  createGiftSchema,
  updateGiftSchema,
  type CreateGiftInput,
  type Gift,
  type UpdateGiftInput
} from './gift.schema'

export class GiftService extends BaseService<Gift> {
  constructor() {
    super(new GiftRepositorySupabase())
  }

  create(input: CreateGiftInput) {
    return super.create(createGiftSchema.parse(input))
  }

  update(id: string, input: UpdateGiftInput) {
    return super.update(id, updateGiftSchema.parse(input))
  }
}

export const giftService = new GiftService()

export function createGift(input: CreateGiftInput) {
  return giftService.create(input)
}

export function updateGift(id: string, input: UpdateGiftInput) {
  return giftService.update(id, input)
}

export function getGift(id: string) {
  return giftService.getOne(id)
}

export function getGifts(params?: PaginationParams) {
  return giftService.getPaginate(params)
}

export function getAllGifts() {
  return giftService.getAll()
}

export function deleteGift(id: string) {
  return giftService.delete(id)
}
