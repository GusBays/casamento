import { BaseService } from '@/lib/base.service'
import { giftService } from '@/modules/gift/core/domain/gift.service'
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
      guest_id: parsed.guest_id,
      cart_id: parsed.cart_id,
      note: parsed.note,
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

  async updatePaymentForOrder(
    orderId: string,
    input: Parameters<OrderPaymentService['update']>[1]
  ) {
    const [payment] = await this.orderPaymentService.getByOrderId(orderId)

    if (!payment) return null

    return this.orderPaymentService.update(payment.id, input)
  }

  async confirmManualPayment(orderId: string) {
    const order = await this.getOne(orderId)

    if (order.status === 'paid') return order

    await this.update(order.id, { status: 'paid' })
    await this.updatePaymentForOrder(order.id, { status: 'paid' })

    await Promise.all(
      order.items.map(async (item) => {
        if (!item.gift_id) return

        const gift = await giftService.getOne(item.gift_id)
        const remaining = Math.max(gift.remaining - item.quantity, 0)

        await giftService.update(gift.id, {
          remaining,
          status: remaining === 0 ? 'purchased' : 'available'
        })
      })
    )

    return this.getOne(order.id)
  }
}

export const orderService = new OrderService()
