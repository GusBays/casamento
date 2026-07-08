import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/common/components/site-header";
import { GiftCard } from "@/modules/gift/ui/components/gift-card";
import { getPaginateGifts } from "@/modules/gift/ui/gift.action";

export default async function Home() {
  const gifts = await getPaginateGifts({ page: 1, perPage: 8 });

  return (
    <>
      <SiteHeader />
      <main className="snap-y snap-mandatory overflow-x-hidden bg-[#fbfaf5] text-[#161616]">
        <section
          id="inicio"
          className="relative grid h-svh snap-start place-items-center overflow-hidden bg-[#ece8dc] pt-16"
        >
          <picture className="absolute inset-0 flex items-center justify-center">
            <source media="(max-width: 640px)" srcSet="/banner-mobile.png" />
            <source media="(max-width: 1024px)" srcSet="/banner-tablet.png" />
            <img
              src="/banner-desktop.png"
              srcSet="/banner-mobile.png 426w, /banner-tablet.png 600w, /banner-desktop.png 800w"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 52vw"
              alt="Ana Julia e Gustavo convidam você para esse dia especial"
              className="h-full w-full object-contain"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#151712]/20 via-transparent to-[#151712]/10" />
          <div className="relative z-10 flex min-h-[calc(100svh-4rem)] w-full items-end justify-center px-6 pb-12 text-center">
            <div className="space-y-5 text-[#fbfaf5] drop-shadow-lg">
              <Image
                src="/logo.png"
                alt="Logo Gustavo e Ana"
                width={180}
                height={180}
                className="mx-auto size-32 object-contain md:size-44"
              />
              <h1 className="font-serif text-4xl leading-none md:text-6xl">Gustavo & Ana</h1>
            </div>
          </div>
        </section>

        <section id="convite" className="ornate-page h-svh snap-start px-5 py-16">
          <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={156}
              height={156}
              className="mb-8 size-24 object-contain sm:size-28 md:size-32"
            />
            <p className="max-w-4xl font-serif text-[clamp(1.15rem,2.7vw,2.35rem)] leading-tight">
              ASSIM ELES JÁ NÃO SÃO DOIS, MAS SIM SÓ CARNE.
              <br />
              PORTANTO O QUE DEUS UNIU, NINGUEM SEPARE
            </p>
            <div className="my-8 grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 font-serif text-[clamp(1.7rem,4.4vw,3.6rem)]">
              <span>17 out</span>
              <span aria-hidden>|</span>
              <span>14H30</span>
            </div>
            <div className="space-y-5 font-serif text-[clamp(1.25rem,2.7vw,2.45rem)]">
              <div className="space-y-2">
                <h2>PAROQUIA SANTA CATARIA</h2>
                <p className="text-[clamp(1rem,2.1vw,1.85rem)] underline">
                  Rua Graciliano Ramos, 230, São Leopoldo
                </p>
              </div>
              <p className="text-[clamp(1rem,2vw,1.7rem)]">RECEPÇÃO:</p>
              <div className="space-y-2">
                <h2>BLEST&nbsp;&nbsp; EVENTOS</h2>
                <p className="text-[clamp(1rem,2.1vw,1.85rem)] underline">
                  Rua Cedro, 39, Sapucaia do Sul,
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="confirmacao" className="ornate-page min-h-svh snap-start px-5 py-24">
          <div className="mx-auto flex min-h-[calc(100svh-12rem)] max-w-5xl flex-col items-center justify-center gap-10 text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={180}
              height={180}
              className="size-36 object-contain md:size-48"
            />
            <p className="font-serif text-3xl md:text-5xl">Clique no botão</p>
            <Link className="wedding-pill" href="/confirmar-presenca">
              confirme sua presença
            </Link>
            <p className="text-xl font-semibold md:text-2xl">confirmação até dia 19/09</p>
            <a className="wedding-pill" href="#vestimenta">
              informações de vestimenta
            </a>
            <a className="wedding-pill" href="#presentes">
              Lista de presentes
            </a>
          </div>
        </section>

        <section id="vestimenta" className="ornate-page dress-section min-h-svh snap-start px-5 py-24">
          <div className="dress-hover-overlay" aria-hidden />
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-12rem)] max-w-6xl flex-col items-center justify-center text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={168}
              height={168}
              className="mb-6 size-32 object-contain md:size-44"
            />
            <h2 className="dress-title mb-3">
              <span>Dress</span> code
            </h2>
            <p className="mb-6 font-serif text-2xl md:text-3xl">Social</p>
            <p className="mb-8 max-w-3xl font-serif text-lg leading-relaxed md:text-xl">
              Queremos que todos se sintam a vontade, lindos e especiais nesse dia tão importante
              para nós.
            </p>
            <div className="dress-stage grid w-full items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
              <div className="dress-copy dress-copy--ele order-2 space-y-4 md:order-1">
                <h3 className="script-heading">Eles</h3>
                <p className="mx-auto max-w-xs font-serif text-lg leading-snug md:text-xl">
                  Terno ou blazer com camisa social. Gravata é opcional, Também pode vir com trage
                  tipico gaucho.
                </p>
              </div>
              <div className="order-1 flex justify-center gap-2 md:order-2">
                <div className="dress-person dress-person--ele" tabIndex={0}>
                  <Image
                    src="/ele.png"
                    alt="Traje masculino"
                    width={220}
                    height={420}
                    className="h-72 w-auto object-contain md:h-96"
                  />
                </div>
                <div className="dress-person dress-person--ela" tabIndex={0}>
                  <Image
                    src="/ela.png"
                    alt="Traje feminino"
                    width={220}
                    height={420}
                    className="h-72 w-auto object-contain md:h-96"
                  />
                </div>
              </div>
              <div className="dress-copy dress-copy--ela order-3 space-y-4">
                <h3 className="script-heading">Elas</h3>
                <p className="mx-auto max-w-xs font-serif text-lg leading-snug md:text-xl">
                  Vestidos midi ou longos, macacões ou conjuntos. Cores e estampas são bem vindas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="presentes" className="ornate-page min-h-svh snap-start px-5 py-24">
          <div className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-6xl flex-col justify-center gap-10">
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              <Image
                src="/logo.png"
                alt="Logo Gustavo e Ana"
                width={176}
                height={176}
                className="mx-auto size-32 object-contain md:size-40"
              />
              <h2 className="gift-title">
                <span>lista</span> de
                <br />
                presentes
              </h2>
              <p className="font-serif text-xl leading-relaxed md:text-2xl">
                Cada presente recebido fará parte da historia que estamos começando a construir.
                Por isso, optamos por receber as contribuições via Pix,
              </p>
              <h3 className="pt-4 font-serif text-2xl font-semibold italic md:text-3xl">
                como efetuar a compra
              </h3>
              <ol className="mx-auto max-w-5xl list-decimal space-y-2 pl-8 text-left text-lg leading-tight md:text-xl">
                <li>Escolha seu presente ou parte do valor do presente desejado</li>
                <li>Clique em “comprar” e realize o pix atraves do seu banco.</li>
                <li>
                  deixe uma mensagem de carinho para sabermos que foi o seu presente que recebemos.
                </li>
              </ol>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {gifts.data.map((gift) => (
                <GiftCard gift={gift} key={gift.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
