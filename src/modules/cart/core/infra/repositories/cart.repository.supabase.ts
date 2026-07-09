import {
  SupabaseRepository,
  type PaginatedResult,
  type PaginationParams
} from '@/lib/supabase/supabase.repository'
import type { Cart, CartRecord } from '@/modules/cart/core/domain/cart.schema'

export class CartRepositorySupabase extends SupabaseRepository<CartRecord, Cart> {
  protected readonly TABLE = 'carts'

  async getOne(id: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select('*, items:cart_items(*, gift:gifts(remaining, quotes, status))')
      .eq('id', id)
      .single<Cart>()

    if (error) throw error

    return data
  }

  async getByToken(token: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select('*, items:cart_items(*, gift:gifts(remaining, quotes, status))')
      .eq('token', token)
      .maybeSingle<Cart>()

    if (error) throw error

    return data
  }

  async getPaginate(params: PaginationParams = {}): Promise<PaginatedResult<Cart>> {
    const page = Math.max(params.page ?? 1, 1)
    const perPage = Math.max(params.perPage ?? 20, 1)
    const from = (page - 1) * perPage
    const to = from + perPage - 1
    const supabase = await this.client()
    const { data, error, count } = await supabase
      .from(this.TABLE)
      .select('*, items:cart_items(*, gift:gifts(remaining, quotes, status))', { count: 'exact' })
      .range(from, to)
      .overrideTypes<Cart[], { merge: false }>()

    if (error) throw error

    const total = count ?? 0
    const lastPage = Math.max(Math.ceil(total / perPage), 1)

    return {
      data: data ?? [],
      pageInfo: {
        total,
        page,
        perPage,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1
      }
    }
  }

  async getAll() {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select('*, items:cart_items(*, gift:gifts(remaining, quotes, status))')
      .overrideTypes<Cart[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }
}
