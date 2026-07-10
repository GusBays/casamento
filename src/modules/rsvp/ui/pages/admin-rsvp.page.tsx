import { createClient } from '@/lib/supabase/server'

type Rsvp = {
  id: string
  guest_id: string
  companions: string | null
  created_at?: string
  guest: {
    name: string
    email: string
  } | null
}

export async function AdminRsvpPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('rsvps')
    .select('*, guest:guests(name, email)')
    .order('created_at', { ascending: false })
    .overrideTypes<Rsvp[], { merge: false }>()

  if (error) {
    return (
      <div className="space-y-4">
        <header>
          <p className="text-sm text-muted-foreground">Confirmações</p>
          <h1 className="text-2xl font-semibold">RSVP</h1>
        </header>
        <p className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
          Não foi possível carregar as confirmações. Verifique se a tabela rsvps foi
          criada no Supabase.
        </p>
      </div>
    )
  }

  const rsvps = data ?? []

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Confirmações</p>
        <h1 className="text-2xl font-semibold">RSVP</h1>
      </header>

      <div className="overflow-hidden rounded-lg border bg-background">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="border-b bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Convidado</th>
              <th className="px-4 py-3 font-medium">Acompanhantes</th>
              <th className="px-4 py-3 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map(rsvp => (
              <tr className="border-b last:border-0" key={rsvp.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{rsvp.guest?.name ?? '-'}</p>
                  <p className="text-xs text-muted-foreground">{rsvp.guest?.email ?? '-'}</p>
                </td>
                <td className="px-4 py-3">{rsvp.companions ?? '-'}</td>
                <td className="px-4 py-3">{formatDate(rsvp.created_at)}</td>
              </tr>
            ))}
            {rsvps.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={3}>
                  Nenhuma confirmação registrada.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
