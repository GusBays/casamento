import { CartSheet } from "@/modules/cart/ui/components/cart-sheet";
import { getCurrentCart } from "@/modules/cart/ui/cart.action";

export async function FloatingCart() {
  const cart = await getCurrentCart();
  const items = cart?.items ?? [];

  if (items.length === 0) return null;

  const totalCents = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      <CartSheet items={items} totalCents={totalCents} />
    </div>
  );
}
