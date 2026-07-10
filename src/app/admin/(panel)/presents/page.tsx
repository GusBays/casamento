import { AdminGiftsPage } from '@/modules/gift/ui/pages/admin-gifts.page'

type AdminPresentsPageProps = {
  searchParams: Promise<{ notice?: string }>
}

export default async function AdminPresentsPage({ searchParams }: AdminPresentsPageProps) {
  const params = await searchParams

  return <AdminGiftsPage notice={params.notice} />
}
