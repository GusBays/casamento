import { Button } from '@/components/ui/button'
import { AdminPagination } from '@/common/components/admin-pagination'
import { AdminTableSearch } from '@/common/components/admin-table-search'
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

type AdminOrdersPageProps = {
  page?: number
  limit?: number
  q?: string
}

export async function AdminOrdersPage({ page = 1, limit = 15, q }: AdminOrdersPageProps) {
  const currentPage = Math.max(page, 1)
  const perPage = limit
  const from = (currentPage - 1) * perPage
  const to = from + perPage - 1
  const supabase = await createClient()
  let query = supabase
    .from('orders')
    .select('*, guest:guests(name, email, phone), items:order_items(*), payment:order_payments(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (q?.trim()) {
    const search = q.trim().replaceAll(',', ' ')
    query = query.or(`id.ilike.%${search}%,status.ilike.%${search}%,note.ilike.%${search}%`)
  }

  const { data, error, count } = await query
    .overrideTypes<AdminOrder[], { merge: false }>()

  if (error) throw error

  const orders = data ?? []
  const total = count ?? 0
  const lastPage = Math.max(Math.ceil(total / perPage), 1)
  const pageInfo = {
    total,
    page: currentPage,
    perPage,
    lastPage,
    hasNextPage: currentPage < lastPage,
    hasPreviousPage: currentPage > 1
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Pedidos</p>
        <h1 className="text-2xl font-semibold">Pedidos</h1>
      </header>
      <AdminTableSearch placeholder="Buscar pedidos..." />

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
                      <p className="font-medium">{order.guest?.name ?? 'Anônimo'}</p>
                      <p className="text-xs text-muted-foreground">{order.guest?.email ?? '-'}</p>
                      {order.note ? (
                        <p className="mt-2 max-w-64 whitespace-pre-line text-xs text-muted-foreground">
                          {order.note}
                        </p>
                      ) : null}
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
      <AdminPagination pageInfo={pageInfo} />
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
