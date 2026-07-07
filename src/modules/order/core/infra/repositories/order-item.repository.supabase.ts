import { SupabaseRepository } from '@/lib/supabase/supabase.repository'
import type { OrderItem } from '@/modules/order/core/domain/order-item.schema'

export class OrderItemRepositorySupabase extends SupabaseRepository<OrderItem> {
  protected readonly TABLE = 'order_items'

  async getByOrderId(orderId: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select()
      .eq('order_id', orderId)
      .overrideTypes<OrderItem[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }
}
