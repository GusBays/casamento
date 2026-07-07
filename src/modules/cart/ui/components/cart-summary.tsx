import type { CartItem } from "@/modules/cart/core/domain/cart.schema";

type CartSummaryProps = {
  items: CartItem[];
};

export function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="space-y-4 rounded-lg border p-4">
      <h2 className="font-semibold">Carrinho</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li className="flex justify-between text-sm" key={item.id}>
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>{item.total}</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total: {total}</p>
    </section>
  );
}
