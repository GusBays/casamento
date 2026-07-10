import { AdminGiftsPage } from '@/modules/gift/ui/pages/admin-gifts.page'

type AdminPresentsPageProps = {
  searchParams: Promise<{ notice?: string; page?: string; limit?: string; sort?: string; reverse?: string; q?: string }>
}

export default async function AdminPresentsPage({ searchParams }: AdminPresentsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 15
  const sort = params.sort === 'CREATED_AT' ? params.sort : 'CREATED_AT'
  const reverse = params.reverse !== 'false'

  return (
    <AdminGiftsPage
      notice={params.notice}
      page={page}
      limit={limit}
      sort={sort}
      reverse={reverse}
      q={params.q}
    />
  )
}
