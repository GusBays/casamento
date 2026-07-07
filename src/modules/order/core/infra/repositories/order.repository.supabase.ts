import {
  SupabaseRepository,
  type PaginatedResult,
  type PaginationParams
} from '@/lib/supabase/supabase.repository'
import type { Order, OrderRecord } from '@/modules/order/core/domain/order.schema'

export class OrderRepositorySupabase extends SupabaseRepository<OrderRecord, Order> {
  protected readonly TABLE = 'orders'

  async getOne(id: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select('*, items:order_items(*), payment:order_payments(*)')
      .eq('id', id)
      .single<Order>()

    if (error) throw error

    return data
  }

  async getPaginate(params: PaginationParams = {}): Promise<PaginatedResult<Order>> {
    const page = Math.max(params.page ?? 1, 1)
    const perPage = Math.max(params.perPage ?? 20, 1)
    const from = (page - 1) * perPage
    const to = from + perPage - 1
    const supabase = await this.client()
    const { data, error, count } = await supabase
      .from(this.TABLE)
      .select('*, items:order_items(*), payment:order_payments(*)', { count: 'exact' })
      .range(from, to)
      .overrideTypes<Order[], { merge: false }>()

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
      .select('*, items:order_items(*), payment:order_payments(*)')
      .overrideTypes<Order[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }
}
