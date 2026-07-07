import { SupabaseRepository } from '@/lib/supabase/supabase.repository'
import type { OrderPayment } from '@/modules/order/core/domain/order-payment.schema'

export class OrderPaymentRepositorySupabase extends SupabaseRepository<OrderPayment> {
  protected readonly TABLE = 'order_payments'

  async getByOrderId(orderId: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select()
      .eq('order_id', orderId)
      .overrideTypes<OrderPayment[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }
}
