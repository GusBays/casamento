import { AdminOrdersPage as OrdersPage } from '@/modules/order/ui/pages/admin-orders.page'

type AdminOrdersRouteProps = {
  searchParams: Promise<{ page?: string; limit?: string; q?: string }>
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersRouteProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 15

  return <OrdersPage page={page} limit={limit} q={params.q} />
}
