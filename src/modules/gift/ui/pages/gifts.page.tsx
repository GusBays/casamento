import { getGifts } from '@/modules/gift/core/domain/gift.service'
import { GiftList } from '@/modules/gift/ui/components/gift-list'

export async function GiftsPage() {
  const gifts = await getGifts({ page: 1, perPage: 12 })

  return (
    <GiftList
      gifts={gifts.data}
      initialHasNextPage={gifts.pageInfo.hasNextPage}
      initialPage={gifts.pageInfo.page}
      perPage={gifts.pageInfo.perPage}
    />
  )
}
