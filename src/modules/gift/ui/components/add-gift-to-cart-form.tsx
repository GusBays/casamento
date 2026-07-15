"use client";

import { useRef, useState, useTransition } from "react";
import { Heart, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addGiftToCart } from "@/modules/cart/ui/cart.action";

type AddGiftToCartFormProps = {
  gift: {
    id: string;
    name: string;
    price: number;
    image: string | null;
    remaining: number;
  };
  disabled: boolean;
};

export function AddGiftToCartForm({ gift, disabled }: AddGiftToCartFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const maxQuantity = Math.max(gift.remaining, 1);
  const shouldChooseQuantity = !disabled && maxQuantity > 1;

  function submit(formData: FormData) {
    startTransition(async () => {
      try {
        await addGiftToCart(formData);
        toast.success(
          quantity > 1
            ? `${quantity} cotas adicionadas ao carrinho.`
            : "Presente adicionado ao carrinho."
        );
        formRef.current?.reset();
        setQuantity(1);
        setOpen(false);
      } catch {
        toast.error("Não foi possível adicionar ao carrinho. Tente novamente.");
      }
    });
  }

  const form = (
    <form action={submit} className="w-full" ref={formRef}>
      <input name="giftId" type="hidden" value={gift.id} />
      <input name="name" type="hidden" value={gift.name} />
      <input name="price" type="hidden" value={gift.price} />
      <input name="image" type="hidden" value={gift.image ?? ""} />
      <input name="quantity" type="hidden" value={shouldChooseQuantity ? quantity : 1} />
      <Button
        className="h-8 w-full rounded-full bg-[#3f4d2f] px-1 font-serif text-[0.68rem] text-[#fbfaf5] hover:bg-[#2f3b22] sm:h-10 sm:px-2.5 sm:text-base"
        disabled={disabled || isPending}
        type="submit"
      >
        {isPending ? <Loader2 className="size-3 animate-spin sm:size-4" aria-hidden /> : <Heart className="size-3 sm:size-4" aria-hidden />}
        {isPending ? "Adicionando..." : "Comprar"}
      </Button>
    </form>
  );

  if (!shouldChooseQuantity) return form;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            className="h-8 w-full rounded-full bg-[#3f4d2f] px-1 font-serif text-[0.68rem] text-[#fbfaf5] hover:bg-[#2f3b22] sm:h-10 sm:px-2.5 sm:text-base"
            disabled={disabled}
            type="button"
          />
        }
      >
        <Heart className="size-3 sm:size-4" aria-hidden />
        Comprar
      </SheetTrigger>
      <SheetContent
        className="rounded-t-2xl border-[#9aa07b]/50 bg-[#fbfaf5] px-5 pb-5 text-[#161616]"
        side="bottom"
      >
        <SheetHeader className="px-0 pt-6">
          <SheetTitle className="font-serif text-2xl">Escolha a quantidade</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          <div className="space-y-1">
            <p className="font-serif text-xl">{gift.name}</p>
            <p className="text-sm text-[#5e604f]">
              {maxQuantity} cota{maxQuantity === 1 ? "" : "s"}{" "}
              {maxQuantity === 1 ? "disponível" : "disponíveis"}.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-xs grid-cols-[3rem_1fr_3rem] items-center gap-4">
            <Button
              aria-label="Diminuir quantidade"
              className="size-12 rounded-full"
              disabled={quantity <= 1 || isPending}
              onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
              type="button"
              variant="outline"
            >
              <Minus className="size-4" aria-hidden />
            </Button>
            <div className="rounded-full border border-[#9aa07b]/35 bg-white/70 py-3 text-center font-serif text-3xl">
              {quantity}
            </div>
            <Button
              aria-label="Aumentar quantidade"
              className="size-12 rounded-full"
              disabled={quantity >= maxQuantity || isPending}
              onClick={() => setQuantity((current) => Math.min(current + 1, maxQuantity))}
              type="button"
              variant="outline"
            >
              <Plus className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        <SheetFooter className="px-0">
          {form}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
