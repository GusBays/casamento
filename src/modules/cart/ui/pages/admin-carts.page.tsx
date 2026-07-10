import { AdminPagination } from '@/common/components/admin-pagination'
import { AdminTableSearch } from '@/common/components/admin-table-search'
import { StatusBadge } from '@/common/components/status-badge'
import { formatCurrency } from '@/lib/currency'
import { cartService } from '@/modules/cart/core/domain/cart.service'

type AdminCartsPageProps = {
  page?: number
  limit?: number
  q?: string
}

export async function AdminCartsPage({ page = 1, limit = 15, q }: AdminCartsPageProps) {
  const carts = await cartService.getPaginate({
    page,
    perPage: limit,
    sort: 'CREATED_AT',
    reverse: true,
    q
  })

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Carrinhos</p>
        <h1 className="text-2xl font-semibold">Carrinhos</h1>
      </header>
      <AdminTableSearch placeholder="Buscar carrinhos..." />

      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Itens</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {carts.data.map(cart => (
                <tr className="border-b align-top last:border-0" key={cart.id}>
                  <td className="px-4 py-3 font-mono text-xs">{cart.id}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={cart.status} />
                  </td>
                  <td className="px-4 py-3">
                    <ul className="grid gap-1">
                      {cart.items.map(item => (
                        <li key={item.id}>
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(cart.total)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{cart.order_id ?? '-'}</td>
                  <td className="px-4 py-3">{formatDate(cart.created_at)}</td>
                </tr>
              ))}
              {carts.data.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-muted-foreground" colSpan={6}>
                    Nenhum carrinho registrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPagination pageInfo={carts.pageInfo} />
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
