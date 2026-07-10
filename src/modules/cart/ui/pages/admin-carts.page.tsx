import { StatusBadge } from '@/common/components/status-badge'
import { formatCurrency } from '@/lib/currency'
import { cartService } from '@/modules/cart/core/domain/cart.service'

export async function AdminCartsPage() {
  const carts = await cartService.getAll()

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Carrinhos</p>
        <h1 className="text-2xl font-semibold">Carrinhos</h1>
      </header>

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
              {carts.map(cart => (
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
              {carts.length === 0 ? (
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
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
