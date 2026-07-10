import { formatCurrency } from '@/lib/currency'
import type { OrderItem } from '@/modules/order/core/domain/order-item.schema'

type OrderSummaryProps = {
  items: OrderItem[]
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <section className="space-y-4 rounded-lg border p-4">
      <h2 className="font-semibold">Pedido</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li className="flex justify-between text-sm" key={item.id}>
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>{formatCurrency(item.total)}</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total: {formatCurrency(total)}</p>
    </section>
  )
}
