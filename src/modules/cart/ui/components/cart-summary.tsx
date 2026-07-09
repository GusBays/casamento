import type { CartItem } from "@/modules/cart/core/domain/cart.schema";
import { CartItemRow } from "@/modules/cart/ui/components/cart-item-row";
import { formatCurrency } from "@/lib/currency";

type CartSummaryProps = {
  items: CartItem[];
};

export function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="space-y-4 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/85 p-4">
      <h2 className="font-serif text-2xl">Carrinho</h2>
      <ul className="divide-y divide-[#9aa07b]/25">
        {items.map((item) => (
          <li key={`${item.id}-${item.quantity}`}>
            <CartItemRow item={item} />
          </li>
        ))}
      </ul>
      <p className="text-right font-serif text-2xl">Total: {formatCurrency(total)}</p>
    </section>
  );
}
