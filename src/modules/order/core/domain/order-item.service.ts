import { BaseService } from '@/lib/base.service'
import { OrderItemRepositorySupabase } from '@/modules/order/core/infra/repositories/order-item.repository.supabase'
import {
  createOrderItemSchema,
  type CreateOrderItemInput,
  type OrderItem
} from './order-item.schema'

export class OrderItemService extends BaseService<OrderItem> {
  constructor() {
    super(new OrderItemRepositorySupabase())
  }

  createForOrder(orderId: string, input: CreateOrderItemInput) {
    const parsed = createOrderItemSchema.parse(input)
    const total = parsed.price * parsed.quantity

    return super.create({ ...parsed, order_id: orderId, total })
  }

  getByOrderId(orderId: string) {
    return (this.repository as OrderItemRepositorySupabase).getByOrderId(orderId)
  }
}
