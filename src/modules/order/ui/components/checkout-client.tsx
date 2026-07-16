import { BackHomeLink } from '@/common/components/back-home-link'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/currency'
import type { CartItem } from '@/modules/cart/core/domain/cart.schema'
import { CartItemRow } from '@/modules/cart/ui/components/cart-item-row'
import { CheckoutForm } from '@/modules/order/ui/components/checkout-form'

type CheckoutClientProps = {
  items: CartItem[]
  total: number
}

export function CheckoutClient({ items, total }: CheckoutClientProps) {
  const hasItems = items.length > 0

  return (
    <main className="ornate-page min-h-svh px-4 py-24 text-[#161616]">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_400px] items-start">
        <div className="space-y-7">
          <BackHomeLink />
          <div className="space-y-4">
            <h1 className="font-serif text-4xl leading-none md:text-5xl">
              Confirme seu presente.
            </h1>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-[#38382f]">
              Você pode assinar o presente com seu nome ou seguir de forma anônima.
            </p>
          </div>

          <CheckoutForm disabled={!hasItems} />
        </div>

        <aside className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/90 p-5 shadow-sm">
          <div className="space-y-5">
            <h2 className="font-serif text-2xl">Resumo</h2>
            {items.length === 0 ? (
              <p className="text-sm leading-6 text-[#5e604f]">
                Nenhum item no carrinho. Volte para a lista de presentes e escolha uma
                contribuição.
              </p>
            ) : (
              <ul className="divide-y divide-[#9aa07b]/25">
                {items.map(item => (
                  <li key={`${item.id}-${item.quantity}`}>
                    <CartItemRow item={item} />
                  </li>
                ))}
              </ul>
            )}

            <Separator />
            <div className="flex items-center justify-between font-serif text-xl">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <p className="text-sm leading-6 text-[#5e604f]">
              O Pix será gerado na próxima tela com o valor exato deste pedido.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}
