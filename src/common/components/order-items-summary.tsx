import Image from "next/image";
import { Gift } from "lucide-react";

import { formatCurrency } from "@/lib/currency";

type SummaryItem = {
  id: string;
  name: string;
  image?: string | null;
  quantity: number;
  price: number;
  total: number;
};

type OrderItemsSummaryProps = {
  items: SummaryItem[];
};

export function OrderItemsSummary({ items }: OrderItemsSummaryProps) {
  return (
    <ul className="divide-y divide-[#9aa07b]/25">
      {items.map((item) => (
        <li className="flex gap-3 py-3 text-sm" key={item.id}>
          <div className="relative grid size-16 flex-none place-items-center overflow-hidden rounded-md bg-[#eef0e3] text-[#3f4d2f]">
            {item.image ? (
              <Image
                alt={item.name}
                className="object-cover"
                fill
                sizes="4rem"
                src={item.image}
              />
            ) : (
              <Gift className="size-5" aria-hidden />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-base leading-tight">{item.name}</p>
            <p className="mt-1 text-xs text-[#5e604f]">
              {item.quantity} x {formatCurrency(item.price)}
            </p>
          </div>
          <p className="flex-none text-right font-medium">{formatCurrency(item.total)}</p>
        </li>
      ))}
    </ul>
  );
}
