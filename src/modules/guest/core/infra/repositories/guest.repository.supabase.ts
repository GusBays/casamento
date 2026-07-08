import { SupabaseRepository } from '@/lib/supabase/supabase.repository'
import type { Guest } from '@/modules/guest/core/domain/guest.schema'

export class GuestRepositorySupabase extends SupabaseRepository<Guest> {
  protected readonly TABLE = 'guests'

  async getByEmail(email: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select()
      .eq('email', email.toLowerCase())
      .maybeSingle<Guest>()

    if (error) throw error

    return data
  }
}
