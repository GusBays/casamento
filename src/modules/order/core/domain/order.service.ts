import { BaseService } from '@/lib/base.service'
import { OrderRepositorySupabase } from '@/modules/order/core/infra/repositories/order.repository.supabase'
import { OrderItemService } from './order-item.service'
import { OrderPaymentService } from './order-payment.service'
import {
  createOrderWithItemsSchema,
  updateOrderSchema,
  type CreateOrderInput,
  type Order,
  type OrderRecord,
  type UpdateOrderInput
} from './order.schema'

export class OrderService extends BaseService<OrderRecord, Order> {
  constructor(
    private readonly orderItemService: OrderItemService = new OrderItemService(),
    private readonly orderPaymentService: OrderPaymentService = new OrderPaymentService()
  ) {
    super(new OrderRepositorySupabase())
  }

  async create(input: CreateOrderInput) {
    const parsed = createOrderWithItemsSchema.parse(input)
    const total = parsed.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = await this.repository.create({
      guest_email: parsed.guest_email,
      guest_name: parsed.guest_name,
      guest_message: parsed.guest_message,
      status: parsed.status,
      total
    })

    await Promise.all(parsed.items.map((item) => this.orderItemService.createForOrder(order.id, item)))
    await this.orderPaymentService.createForOrder(order.id, parsed.payment)

    return this.getOne(order.id)
  }

  update(id: string, input: UpdateOrderInput) {
    return super.update(id, updateOrderSchema.parse(input))
  }

  getItems(orderId: string) {
    return this.orderItemService.getByOrderId(orderId)
  }

  getPayments(orderId: string) {
    return this.orderPaymentService.getByOrderId(orderId)
  }
}

export const orderService = new OrderService()
