import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/common/components/status-badge'
import { formatCurrency } from '@/lib/currency'
import { createClient } from '@/lib/supabase/server'
import type { OrderItem } from '@/modules/order/core/domain/order-item.schema'
import type { OrderPayment } from '@/modules/order/core/domain/order-payment.schema'
import { markOrderAsPaid } from '@/modules/order/ui/order.action'

type AdminOrder = {
  id: string
  status: string
  total: number
  note: string | null
  created_at?: string
  guest: {
    name: string
    email: string
    phone: string | null
  } | null
  items: OrderItem[]
  payment: OrderPayment | OrderPayment[] | null
}

export async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, guest:guests(name, email, phone), items:order_items(*), payment:order_payments(*)')
    .order('created_at', { ascending: false })
    .overrideTypes<AdminOrder[], { merge: false }>()

  if (error) throw error

  const orders = data ?? []

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Pedidos</p>
        <h1 className="text-2xl font-semibold">Pedidos</h1>
      </header>

      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Convidado</th>
                <th className="px-4 py-3 font-medium">Itens</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Pagamento</th>
                <th className="px-4 py-3 font-medium">Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const payment = Array.isArray(order.payment)
                  ? order.payment[0]
                  : order.payment
                const isPaid = order.status === 'paid' || payment?.status === 'paid'

                return (
                  <tr className="border-b align-top last:border-0" key={order.id}>
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs">{order.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.guest?.name ?? '-'}</p>
                      <p className="text-xs text-muted-foreground">{order.guest?.email ?? '-'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="grid gap-1">
                        {order.items.map(item => (
                          <li key={item.id}>
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={payment?.status ?? 'pending'} />
                    </td>
                    <td className="px-4 py-3">
                      <form action={markOrderAsPaid}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <Button disabled={isPaid} size="sm" type="submit">
                          {isPaid ? 'Pago' : 'Marcar como pago'}
                        </Button>
                      </form>
                    </td>
                  </tr>
                )
              })}
              {orders.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-muted-foreground" colSpan={7}>
                    Nenhum pedido registrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
