import { Gift, Heart } from 'lucide-react'

import { formatCurrency } from '@/common/data/gifts'
import type { Gift as GiftType } from '@/common/types/gift'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { addGiftToCart } from '@/modules/cart/ui/cart.action'

type GiftCardProps = {
  gift: GiftType
}

export function GiftCard({ gift }: GiftCardProps) {
  const disabled = gift.status !== 'available'

  return (
    <Card className="overflow-hidden rounded-lg">
      <CardHeader className="gap-4">
        <div className="flex size-11 items-center justify-center rounded-md bg-rose-100 text-rose-700">
          <Gift className="size-5" aria-hidden />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl">{gift.title}</CardTitle>
          <Badge variant={disabled ? 'secondary' : 'default'}>
            {disabled ? 'Reservado' : 'Disponivel'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="min-h-12 text-sm leading-6 text-muted-foreground">
          {gift.description}
        </p>
        <p className="text-2xl font-semibold">{formatCurrency(gift.priceCents)}</p>
      </CardContent>
      <CardFooter>
        <form action={addGiftToCart} className="w-full">
          <input name="giftId" type="hidden" value={gift.id} />
          <input name="name" type="hidden" value={gift.title} />
          <input name="price" type="hidden" value={gift.priceCents} />
          <Button className="w-full" disabled={disabled} type="submit">
            <Heart className="size-4" aria-hidden />
            Presentear
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
