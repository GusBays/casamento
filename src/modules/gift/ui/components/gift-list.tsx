import type { Gift } from '@/modules/gift/core/domain/gift.schema'

type GiftListProps = {
  gifts: Gift[]
}

export function GiftList({ gifts }: GiftListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gifts.map(gift => (
        <article className="rounded-lg border p-4" key={gift.id}>
          <h2 className="font-semibold">{gift.name}</h2>
          <p className="text-sm text-muted-foreground">
            {gift.remaining} cotas restantes
          </p>
        </article>
      ))}
    </div>
  )
}
