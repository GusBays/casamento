import { AdminCartsPage as CartsPage } from '@/modules/cart/ui/pages/admin-carts.page'

type AdminCartsRouteProps = {
  searchParams: Promise<{ page?: string; limit?: string; q?: string }>
}

export default async function AdminCartsPage({ searchParams }: AdminCartsRouteProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 15

  return <CartsPage page={page} limit={limit} q={params.q} />
}
