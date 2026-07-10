import { BaseService } from '@/lib/base.service'
import { GuestRepositorySupabase } from '@/modules/guest/core/infra/repositories/guest.repository.supabase'
import {
  createGuestSchema,
  updateGuestSchema,
  type CreateGuestInput,
  type Guest,
  type UpdateGuestInput
} from './guest.schema'

export class GuestService extends BaseService<Guest> {
  constructor() {
    super(new GuestRepositorySupabase())
  }

  create(input: CreateGuestInput) {
    const parsed = createGuestSchema.parse({
      ...input,
      email: input.email.toLowerCase()
    })

    return super.create(parsed)
  }

  update(id: string, input: UpdateGuestInput) {
    return super.update(id, updateGuestSchema.parse(input))
  }

  getByEmail(email: string) {
    return (this.repository as GuestRepositorySupabase).getByEmail(email)
  }

  async upsertByEmail(input: CreateGuestInput) {
    const parsed = createGuestSchema.parse({
      ...input,
      email: input.email.toLowerCase()
    })
    const currentGuest = await this.getByEmail(parsed.email)

    if (!currentGuest) {
      return this.create(parsed)
    }

    return this.update(currentGuest.id, {
      name: parsed.name,
      ...(parsed.phone ? { phone: parsed.phone } : {})
    })
  }
}

export const guestService = new GuestService()
