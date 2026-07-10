'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import type { PaginatedResult } from '@/lib/supabase/supabase.repository'

type AdminPaginationProps = {
  pageInfo: PaginatedResult<unknown>['pageInfo']
}

const limitOptions = [15, 25, 50, 100]

export function AdminPagination({ pageInfo }: AdminPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (pageInfo.total === 0) return null

  function pushWith(params: Record<string, string | number>) {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(params).forEach(([key, value]) => {
      nextParams.set(key, String(value))
    })

    router.push(`?${nextParams.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Página {pageInfo.page} de {pageInfo.lastPage} · {pageInfo.total} registros
      </p>
      <div className="flex items-center gap-2">
        <select
          aria-label="Registros por página"
          className="h-7 rounded-lg border border-input bg-background px-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          value={pageInfo.perPage}
          onChange={event => pushWith({ limit: event.target.value, page: 1 })}
        >
          {limitOptions.map(limit => (
            <option key={limit} value={limit}>
              {limit} por página
            </option>
          ))}
        </select>
        <Button
          disabled={!pageInfo.hasPreviousPage}
          size="sm"
          type="button"
          variant="outline"
          onClick={() => pushWith({ page: Math.max(pageInfo.page - 1, 1) })}
        >
          Anterior
        </Button>
        <Button
          disabled={!pageInfo.hasNextPage}
          size="sm"
          type="button"
          variant="outline"
          onClick={() => pushWith({ page: Math.min(pageInfo.page + 1, pageInfo.lastPage) })}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
