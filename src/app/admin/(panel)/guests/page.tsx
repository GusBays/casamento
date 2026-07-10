import { AdminGuestsPage as GuestsPage } from '@/modules/guest/ui/pages/admin-guests.page'

type AdminGuestsRouteProps = {
  searchParams: Promise<{ page?: string; limit?: string; q?: string }>
}

export default async function AdminGuestsPage({ searchParams }: AdminGuestsRouteProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 15

  return <GuestsPage page={page} limit={limit} q={params.q} />
}
