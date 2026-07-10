import Link from 'next/link'
import { Plus } from 'lucide-react'

import { AdminNoticeToast } from '@/app/admin/_components/admin-notice-toast'
import { AdminPagination } from '@/common/components/admin-pagination'
import { AdminTableSearch } from '@/common/components/admin-table-search'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/common/components/status-badge'
import { formatCurrency } from '@/lib/currency'
import { cn } from '@/lib/utils'
import { getGifts } from '@/modules/gift/core/domain/gift.service'

type AdminGiftsPageProps = {
  notice?: string
  page?: number
  limit?: number
  sort?: 'CREATED_AT'
  reverse?: boolean
  q?: string
}

export async function AdminGiftsPage({
  notice,
  page = 1,
  limit = 15,
  sort = 'CREATED_AT',
  reverse = true,
  q
}: AdminGiftsPageProps) {
  const gifts = await getGifts({ page, perPage: limit, sort, reverse, q })

  return (
    <div className="space-y-6">
      <AdminNoticeToast notice={notice} />

      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Presentes</p>
          <h1 className="text-2xl font-semibold">Lista de presentes</h1>
        </div>
        <Link className={cn(buttonVariants(), 'gap-1.5')} href="/admin/presents/new">
          <Plus className="size-4" aria-hidden />
          Novo presente
        </Link>
      </header>
      <AdminTableSearch placeholder="Buscar presentes..." />

      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Imagem</th>
                <th className="px-4 py-3 font-medium">Presente</th>
                <th className="px-4 py-3 font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Comprados</th>
                <th className="px-4 py-3 font-medium">Restantes</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {gifts.data.map(gift => (
                <tr className="border-b transition-colors hover:bg-muted/50 last:border-0" key={gift.id}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/presents/${gift.id}`}>
                      {gift.image ? (
                        <span
                          aria-label={gift.name}
                          className="block size-14 rounded-md border bg-cover bg-center"
                          role="img"
                          style={{ backgroundImage: `url("${gift.image}")` }}
                        />
                      ) : (
                        <div className="grid size-14 place-items-center rounded-md border bg-muted text-xs text-muted-foreground">
                          -
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="font-medium">
                    <Link className="block px-4 py-3" href={`/admin/presents/${gift.id}`}>
                      {gift.name}
                    </Link>
                  </td>
                  <td>
                    <Link className="block px-4 py-3" href={`/admin/presents/${gift.id}`}>
                      {formatCurrency(gift.price)}
                    </Link>
                  </td>
                  <td>
                    <Link className="block px-4 py-3" href={`/admin/presents/${gift.id}`}>
                      {gift.quotes - gift.remaining}
                    </Link>
                  </td>
                  <td>
                    <Link className="block px-4 py-3" href={`/admin/presents/${gift.id}`}>
                      {gift.remaining} de {gift.quotes}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link className="block" href={`/admin/presents/${gift.id}`}>
                      <StatusBadge status={gift.status ?? 'available'} />
                    </Link>
                  </td>
                </tr>
              ))}
              {gifts.data.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-muted-foreground" colSpan={6}>
                    Nenhum presente cadastrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPagination pageInfo={gifts.pageInfo} />
    </div>
  )
}
