import Link from "next/link";
import { CalendarHeart, Gift, MapPin, Sparkles, Users } from "lucide-react";

import { SiteHeader } from "@/common/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  { title: "Cerimonia", description: "Data e local entram aqui.", Icon: CalendarHeart },
  { title: "Recepcao", description: "Informacoes para convidados.", Icon: MapPin },
  { title: "Presentes", description: "Escolha e pague com Pix.", Icon: Gift },
  { title: "Presenca", description: "Confirme quem vai junto.", Icon: Users },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="min-h-[calc(100svh-4rem)] border-b bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_48%,#eef2ff_100%)]">
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="size-4 text-rose-700" aria-hidden />
                Vamos celebrar esse dia juntos
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                  Gustavo e Ana
                </h1>
                <p className="max-w-2xl text-xl leading-9 text-muted-foreground">
                  Um site simples, bonito e feito para reunir informacoes do casamento, lista de
                  presentes e pagamento por Pix.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className={buttonVariants({ size: "lg" })} href="/presentes">
                  <Gift className="size-4" aria-hidden />
                  Ver presentes
                </Link>
                <Link
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                  href="/confirmar-presenca"
                >
                  <Users className="size-4" aria-hidden />
                  Confirmar presenca
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {highlights.map(({ title, description, Icon }) => (
                <Card className="rounded-lg bg-white/75 shadow-sm" key={title}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-rose-100 text-rose-700">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div>
                      <h2 className="font-semibold">{title}</h2>
                      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="historia" className="border-b px-4 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-sm font-medium tracking-[0.24em] text-rose-700 uppercase">
              Nossa historia
            </p>
            <div className="space-y-5">
              <h2 className="text-4xl font-semibold tracking-tight text-balance">
                Um comeco de vida nova merece presenca, carinho e boas memorias.
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Esta base deixa pronta a estrutura para animacoes de scroll, secoes do casamento e
                chamadas para a lista de presentes. A proxima iteracao pode adicionar fotos,
                detalhes reais do evento e RSVP.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-lg border bg-card p-8 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight">Lista de presentes</h2>
              <p className="max-w-2xl text-muted-foreground">
                Os convidados escolhem um item, confirmam no checkout e recebem o Pix para pagamento.
              </p>
            </div>
            <Link className={buttonVariants({ size: "lg" })} href="/presentes">
              Abrir lista
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
