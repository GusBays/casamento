import Image from "next/image";
import { Gift } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, roundCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { AddGiftToCartForm } from "@/modules/gift/ui/components/add-gift-to-cart-form";
import type { Gift as GiftType } from "@/modules/gift/core/domain/gift.schema";

type GiftCardProps = {
  gift: GiftType
}

export function GiftCard({ gift }: GiftCardProps) {
  const status = gift.status ?? (gift.remaining > 0 ? "available" : "purchased");
  const disabled = status !== "available";
  const purchased = status === "purchased";
  const quotaPrice = roundCurrency(gift.price / gift.quotes);
  const giftWithQuotaPrice = {
    ...gift,
    price: quotaPrice,
  };
  const description =
    status === "available"
      ? `${gift.remaining} cota${gift.remaining === 1 ? "" : "s"} restante${gift.remaining === 1 ? "" : "s"}.`
      : "Este presente já foi escolhido.";

  return (
    <Card className={cn("overflow-hidden rounded-lg border-[#9aa07b]/35 bg-[#fbfaf5]/85 shadow-sm [--card-spacing:--spacing(2)] sm:[--card-spacing:--spacing(3)] md:[--card-spacing:--spacing(4)]", purchased && "opacity-75")}>
      <div className="aspect-square w-full overflow-hidden bg-[#eef0e3]">
        {gift.image ? (
          <div className="relative h-full w-full">
            <Image
              alt={gift.name}
              className={cn("h-full w-full object-cover", purchased && "grayscale")}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 22rem"
              src={gift.image}
              unoptimized
            />
          </div>
        ) : (
          <div className="grid h-full place-items-center text-[#3f4d2f]">
            <Gift className="size-6 sm:size-8 md:size-10" aria-hidden />
          </div>
        )}
      </div>
      <CardHeader className="gap-2 sm:gap-3">
        <div className="space-y-1.5 sm:space-y-2">
          <CardTitle className={cn("line-clamp-2 min-h-8 font-serif text-[0.86rem] leading-tight sm:min-h-10 sm:text-base md:text-xl", purchased && "line-through decoration-[#3f4d2f]/70 decoration-2")}>
            {gift.name}
          </CardTitle>
          <Badge className={cn("h-4 px-1.5 text-[0.58rem] sm:h-5 sm:px-2 sm:text-xs", disabled ? "" : "bg-[#3f4d2f] text-[#fbfaf5]")} variant={disabled ? "secondary" : "default"}>
            {purchased ? "Comprado" : disabled ? "Indisponível" : "Disponível"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
        <p className="min-h-8 text-[0.66rem] leading-snug text-[#5e604f] sm:min-h-10 sm:text-xs md:min-h-12 md:text-sm md:leading-6">
          {description}
        </p>
        <div>
          <p className="font-serif text-[0.98rem] leading-none sm:text-xl md:text-2xl">{formatCurrency(quotaPrice)}</p>
          {gift.quotes > 1 ? (
            <p className="mt-1 text-[0.52rem] uppercase tracking-[0.08em] text-[#606d42] sm:text-[0.65rem] sm:tracking-[0.16em] md:text-xs">
              por cota
            </p>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="p-1.5 sm:p-(--card-spacing)">
        <AddGiftToCartForm disabled={disabled} gift={giftWithQuotaPrice} />
      </CardFooter>
    </Card>
  );
}
