import { AdminPagination } from '@/common/components/admin-pagination'
import { AdminTableSearch } from '@/common/components/admin-table-search'
import { guestService } from '@/modules/guest/core/domain/guest.service'

type AdminGuestsPageProps = {
  page?: number
  limit?: number
  q?: string
}

export async function AdminGuestsPage({ page = 1, limit = 15, q }: AdminGuestsPageProps) {
  const guests = await guestService.getPaginate({
    page,
    perPage: limit,
    sort: 'CREATED_AT',
    reverse: true,
    q
  })

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Convidados</p>
        <h1 className="text-2xl font-semibold">Lista de convidados</h1>
      </header>
      <AdminTableSearch placeholder="Buscar convidados..." />

      <div className="overflow-hidden rounded-lg border bg-background">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="border-b bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Telefone</th>
              <th className="px-4 py-3 font-medium">Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {guests.data.map(guest => (
              <tr className="border-b last:border-0" key={guest.id}>
                <td className="px-4 py-3 font-medium">{guest.name}</td>
                <td className="px-4 py-3">{guest.email}</td>
                <td className="px-4 py-3">{guest.phone ?? '-'}</td>
                <td className="px-4 py-3">{formatDate(guest.created_at)}</td>
              </tr>
            ))}
            {guests.data.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>
                  Nenhum convidado registrado.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <AdminPagination pageInfo={guests.pageInfo} />
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
