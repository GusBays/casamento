import { BaseService } from '@/lib/base.service'
import { OrderPaymentRepositorySupabase } from '@/modules/order/core/infra/repositories/order-payment.repository.supabase'
import {
  createOrderPaymentSchema,
  updateOrderPaymentSchema,
  type CreateOrderPaymentInput,
  type OrderPayment,
  type UpdateOrderPaymentInput
} from './order-payment.schema'

export class OrderPaymentService extends BaseService<OrderPayment> {
  constructor() {
    super(new OrderPaymentRepositorySupabase())
  }

  createForOrder(orderId: string, input: CreateOrderPaymentInput) {
    return super.create({ ...createOrderPaymentSchema.parse(input), order_id: orderId })
  }

  update(id: string, input: UpdateOrderPaymentInput) {
    return super.update(id, updateOrderPaymentSchema.parse(input))
  }

  getByOrderId(orderId: string) {
    return (this.repository as OrderPaymentRepositorySupabase).getByOrderId(orderId)
  }
}
