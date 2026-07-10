import { getCurrentCart } from '@/modules/cart/ui/cart.action'
import { CheckoutClient } from '@/modules/order/ui/components/checkout-client'

export default async function CheckoutPage() {
  const cart = await getCurrentCart()
  const items = cart?.items ?? []
  const total = items.reduce((sum, item) => sum + item.total, 0)

  return <CheckoutClient items={items} total={total} />
}
