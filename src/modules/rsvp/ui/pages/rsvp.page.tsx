import { CalendarCheck, Users } from 'lucide-react'

import { SiteHeader } from '@/common/components/site-header'
import { RsvpForm } from '@/modules/rsvp/ui/components/rsvp-form'

export function RsvpPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 border-b bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_48%,#eef2ff_100%)]">
        <section className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm text-muted-foreground shadow-sm">
              <CalendarCheck className="size-4 text-rose-700" aria-hidden />
              Gustavo e Ana
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                Confirme sua presenca.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Conta pra gente seu nome e quem vai junto. So isso, sem burocracia.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border bg-white/70 p-4 shadow-sm">
                <Users className="mt-0.5 size-4 text-rose-700" aria-hidden />
                <p>Use o campo de acompanhantes para listar familia, par ou amigos.</p>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-white/70 p-4 shadow-sm">
                <CalendarCheck className="mt-0.5 size-4 text-rose-700" aria-hidden />
                <p>A confirmacao ajuda a organizar recepcao, mesa e carinho nos detalhes.</p>
              </div>
            </div>
          </div>

          <RsvpForm />
        </section>
      </main>
    </>
  )
}
