import { GiftCard } from "@/common/components/gift-card";
import { SiteHeader } from "@/common/components/site-header";
import { gifts } from "@/common/data/gifts";

export default function GiftsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <section className="max-w-2xl space-y-4">
          <p className="text-sm font-medium tracking-[0.24em] text-rose-700 uppercase">
            Lista de presentes
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            Escolha um presente para celebrar com Gustavo e Ana.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Cada item vira uma contribuicao via Pix. Em breve esta lista sera carregada direto do
            Supabase, com disponibilidade atualizada.
          </p>
        </section>
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift) => (
            <GiftCard gift={gift} key={gift.id} />
          ))}
        </section>
      </main>
    </>
  );
}
