import { orderService } from '@/modules/order/core/domain/order.service'
import { OrderSummary } from '@/modules/order/ui/components/order-summary'

type OrderPageProps = {
  orderId: string
}

export async function OrderPage({ orderId }: OrderPageProps) {
  const order = await orderService.getOne(orderId)

  return <OrderSummary items={order.items} />
}
