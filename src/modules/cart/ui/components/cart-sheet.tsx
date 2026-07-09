"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { CartItem } from "@/modules/cart/core/domain/cart.schema";
import { CartItemRow } from "@/modules/cart/ui/components/cart-item-row";

type CartSheetProps = {
  items: CartItem[];
  totalCents: number;
};

export function CartSheet({ items, totalCents }: CartSheetProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label={`Abrir carrinho com ${totalItems} itens`}
            className="relative rounded-full border-[#606d42]/30 bg-[#f9f6ef] text-[#28351f] shadow-[0_12px_30px_rgba(40,53,31,0.18)] hover:bg-[#eef0e3]"
            size="icon-lg"
            variant="outline"
          />
        }
      >
        <ShoppingBag className="size-5" aria-hidden />
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#3f4d2f] text-[0.68rem] font-semibold text-[#fbfaf5]">
          {totalItems}
        </span>
      </SheetTrigger>
      <SheetContent className="border-[#9aa07b]/50 bg-[#fbfaf5] text-[#161616] sm:max-w-md">
        <SheetHeader className="border-b border-[#9aa07b]/30 px-5 py-5">
          <SheetTitle className="font-serif text-xl">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="grid min-h-72 place-items-center text-center">
              <p className="max-w-56 font-serif text-xl leading-tight text-[#3f4d2f]">
                Sua lista de presentes ainda está vazia.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#9aa07b]/25">
              {items.map((item) => (
                <li key={`${item.id}-${item.quantity}`}>
                  <CartItemRow item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="border-t border-[#9aa07b]/30 bg-[#f4f1e9] p-5">
          <div className="flex items-center justify-between font-serif text-xl">
            <span>Total</span>
            <span>{formatCurrency(totalCents)}</span>
          </div>
          <Link
            aria-disabled={items.length === 0}
            className={buttonVariants({
              className:
                "h-11 rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22] aria-disabled:pointer-events-none aria-disabled:opacity-50",
            })}
            href="/checkout"
          >
            Comprar
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
