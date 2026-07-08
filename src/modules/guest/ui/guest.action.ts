'use server'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateGuestInput, UpdateGuestInput } from '@/modules/guest/core/domain/guest.schema'
import { guestService, type GuestService } from '@/modules/guest/core/domain/guest.service'

function service(): GuestService {
  return guestService
}

export async function createGuest(input: CreateGuestInput) {
  return service().create(input)
}

export async function upsertGuestByEmail(input: CreateGuestInput) {
  return service().upsertByEmail(input)
}

export async function updateGuest(id: string, input: UpdateGuestInput) {
  return service().update(id, input)
}

export async function getOneGuest(id: string) {
  return service().getOne(id)
}

export async function getGuestByEmail(email: string) {
  return service().getByEmail(email)
}

export async function getPaginateGuests(params?: PaginationParams) {
  return service().getPaginate(params)
}
