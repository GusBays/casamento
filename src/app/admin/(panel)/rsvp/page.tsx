import { AdminRsvpPage as RsvpPage } from '@/modules/rsvp/ui/pages/admin-rsvp.page'

type AdminRsvpRouteProps = {
  searchParams: Promise<{ page?: string; limit?: string; q?: string }>
}

export default async function AdminRsvpPage({ searchParams }: AdminRsvpRouteProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 15

  return <RsvpPage page={page} limit={limit} q={params.q} />
}
