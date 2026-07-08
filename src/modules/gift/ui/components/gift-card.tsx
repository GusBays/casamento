import { Gift, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { addGiftToCart } from "@/modules/cart/ui/cart.action";
import type { Gift as GiftType } from "@/modules/gift/core/domain/gift.schema";

type GiftCardProps = {
  gift: GiftType
}

export function GiftCard({ gift }: GiftCardProps) {
  const status = gift.status ?? (gift.remaining > 0 ? "available" : "purchased");
  const disabled = status !== "available";
  const description =
    status === "available"
      ? `${gift.remaining} cota${gift.remaining === 1 ? "" : "s"} restante${gift.remaining === 1 ? "" : "s"}.`
      : "Este presente já foi escolhido.";

  return (
    <Card className="overflow-hidden rounded-lg border-[#9aa07b]/35 bg-[#fbfaf5]/85 shadow-sm">
      <CardHeader className="gap-4">
        <div className="flex size-11 items-center justify-center rounded-md bg-[#eef0e3] text-[#3f4d2f]">
          <Gift className="size-5" aria-hidden />
        </div>
        <div className="space-y-2">
          <CardTitle className="font-serif text-xl">{gift.name}</CardTitle>
          <Badge className={disabled ? "" : "bg-[#3f4d2f] text-[#fbfaf5]" } variant={disabled ? "secondary" : "default"}>
            {disabled ? "Indisponível" : "Disponível"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="min-h-12 text-sm leading-6 text-[#5e604f]">
          {description}
        </p>
        <p className="font-serif text-2xl">{formatCurrency(gift.price)}</p>
      </CardContent>
      <CardFooter>
        <form action={addGiftToCart} className="w-full">
          <input name="giftId" type="hidden" value={gift.id} />
          <input name="name" type="hidden" value={gift.name} />
          <input name="price" type="hidden" value={gift.price} />
          <input name="image" type="hidden" value={gift.image ?? ""} />
          <Button
            className="h-10 w-full rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]"
            disabled={disabled}
            type="submit"
          >
            <Heart className="size-4" aria-hidden />
            Comprar
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
