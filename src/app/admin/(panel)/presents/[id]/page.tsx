import { AdminGiftDetailPage as GiftDetail } from '@/modules/gift/ui/pages/admin-gift-detail.page'

type AdminGiftDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminGiftDetailPage({ params }: AdminGiftDetailPageProps) {
  const { id } = await params

  return <GiftDetail id={id} />
}
