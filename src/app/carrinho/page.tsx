import { SiteHeader } from '@/common/components/site-header'
import { CartPage } from '@/modules/cart/ui/pages/cart.page'

export default function CurrentCartPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
        <section className="space-y-3">
          <p className="text-sm font-medium tracking-[0.24em] text-rose-700 uppercase">
            Carrinho
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Seus presentes escolhidos.</h1>
        </section>
        <CartPage />
      </main>
    </>
  )
}
