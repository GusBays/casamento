"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Gift, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/currency";
import type { CartItem } from "@/modules/cart/core/domain/cart.schema";
import { removeCartItem, updateCartItemQuantity } from "@/modules/cart/ui/cart.action";

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const router = useRouter();
  const maxQuantity = Math.max(item.gift?.remaining ?? item.quantity, 1);
  const [quantity, setQuantity] = useState(item.quantity);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function updateQuantity(nextQuantity: number) {
    const clampedQuantity = Math.min(Math.max(nextQuantity, 1), maxQuantity);
    const formData = new FormData();
    formData.set("itemId", item.id);
    formData.set("quantity", String(clampedQuantity));

    setQuantity(clampedQuantity);
    startTransition(async () => {
      try {
        await updateCartItemQuantity(formData);
        router.refresh();
      } catch {
        setQuantity(item.quantity);
        toast.error("Não foi possível atualizar a quantidade. Tente novamente.");
      }
    });
  }

  function confirmRemove() {
    const formData = new FormData();
    formData.set("itemId", item.id);

    startTransition(async () => {
      try {
        await removeCartItem(formData);
        toast.success("Item removido do carrinho.");
        setRemoveOpen(false);
        router.refresh();
      } catch {
        toast.error("Não foi possível remover o item. Tente novamente.");
      }
    });
  }

  return (
    <>
      <div className="grid grid-cols-[4rem_1fr_auto] gap-3 py-5">
        <div className="relative grid size-16 place-items-center overflow-hidden rounded-md bg-[#eef0e3] text-[#3f4d2f]">
          {item.image ? (
            <Image alt={item.name} className="object-cover" fill sizes="4rem" src={item.image} unoptimized />
          ) : (
            <Gift className="size-5" aria-hidden />
          )}
        </div>

        <div className="min-w-0 space-y-3">
          <div>
            <p className="font-serif text-lg leading-tight">{item.name}</p>
            <p className="mt-1 text-sm text-[#5e604f]">
              {formatCurrency(item.price)} cada
            </p>
          </div>

          <div className="grid w-40 grid-cols-[2.25rem_1fr_2.25rem] items-center rounded-full border border-[#9aa07b]/35 bg-white/60">
            <Button
              aria-label={`Diminuir quantidade de ${item.name}`}
              className="rounded-full"
              disabled={isPending}
              onClick={() => {
                if (quantity <= 1) {
                  setRemoveOpen(true);
                  return;
                }

                updateQuantity(quantity - 1);
              }}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <Minus className="size-4" aria-hidden />
            </Button>
            <Input
              aria-label={`Quantidade de ${item.name}`}
              className="h-9 border-0 bg-transparent px-1 text-center font-serif text-base shadow-none focus-visible:ring-0"
              disabled={isPending}
              inputMode="numeric"
              max={maxQuantity}
              min={1}
              onBlur={(event) => updateQuantity(Number(event.currentTarget.value) || 1)}
              onChange={(event) => setQuantity(Number(event.currentTarget.value) || 1)}
              type="number"
              value={quantity}
            />
            <Button
              aria-label={`Aumentar quantidade de ${item.name}`}
              className="rounded-full"
              disabled={isPending || quantity >= maxQuantity}
              onClick={() => updateQuantity(quantity + 1)}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <Plus className="size-4" aria-hidden />
            </Button>
          </div>

          <p className="text-xs text-[#5e604f]">
            {maxQuantity} cota{maxQuantity === 1 ? "" : "s"}{" "}
            {maxQuantity === 1 ? "disponível" : "disponíveis"}.
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-3">
          <Button
            aria-label={`Remover ${item.name}`}
            className="rounded-full"
            disabled={isPending}
            onClick={() => setRemoveOpen(true)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Trash2 className="size-4" aria-hidden />}
          </Button>
          <p className="font-serif text-lg">{formatCurrency(item.price * quantity)}</p>
        </div>
      </div>

      <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
        <DialogContent className="border-[#9aa07b]/50 bg-[#fbfaf5] text-[#161616]">
          <DialogTitle className="font-serif text-2xl">Remover presente?</DialogTitle>
          <DialogDescription className="text-[#5e604f]">
            Você está removendo “{item.name}” do carrinho.
          </DialogDescription>
          <DialogFooter className="bg-transparent">
            <Button disabled={isPending} onClick={() => setRemoveOpen(false)} type="button" variant="outline">
              Cancelar
            </Button>
            <Button disabled={isPending} onClick={confirmRemove} type="button" variant="destructive">
              {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Trash2 className="size-4" aria-hidden />}
              Confirmar remoção
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
