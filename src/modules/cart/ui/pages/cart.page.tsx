import { CartSummary } from '@/modules/cart/ui/components/cart-summary'
import { getCurrentCart, getOneCart } from '@/modules/cart/ui/cart.action'

type CartPageProps = {
  cartId?: string
}

export async function CartPage({ cartId }: CartPageProps) {
  const cart = (await getCurrentCart()) ?? (cartId ? await getOneCart(cartId) : null)

  return <CartSummary items={cart?.items ?? []} />
}
