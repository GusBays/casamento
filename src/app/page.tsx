import Image from 'next/image'

import { AddressDialog } from '@/common/components/address-dialog'
import { FloatingCart } from '@/common/components/floating-cart'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { GiftList } from '@/modules/gift/ui/components/gift-list'
import { getPaginateGifts } from '@/modules/gift/ui/gift.action'
import { RsvpForm } from '@/modules/rsvp/ui/components/rsvp-form'

export default async function Home() {
  const gifts = await getPaginateGifts({ page: 1, perPage: 9 })

  return (
    <>
      <FloatingCart />
      <main className="overflow-x-hidden bg-[#fbfaf5] text-[#161616]">
        <section
          id="inicio"
          className="relative grid h-svh place-items-center overflow-hidden bg-[#ece8dc]"
        >
          <picture className="absolute inset-0">
            <source media="(max-width: 640px)" srcSet="/banner-mobile.png" />
            <source media="(max-width: 1024px)" srcSet="/banner-tablet.png" />
            <img
              src="/banner-desktop.png"
              srcSet="/banner-mobile.png 426w, /banner-tablet.png 600w, /banner-desktop.png 1672w"
              sizes="100vw"
              alt="Ana Julia e Gustavo convidam você para esse dia especial"
              className="h-full w-full object-cover"
            />
          </picture>
        </section>

        <section id="convite" className="ornate-page h-svh px-5 py-16">
          <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={156}
              height={156}
              className="mb-8 size-24 object-contain sm:size-28 md:size-32"
            />
            <p className="italic max-w-4xl font-serif text-[clamp(1.15rem,2.7vw,2.35rem)] leading-tight">
              &quot;ASSIM ELES JÁ NÃO SÃO DOIS, MAS SIM SÓ CARNE. PORTANTO O QUE DEUS
              UNIU, NINGUEM SEPARE&quot;
            </p>
            <div className="my-8 grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 font-serif text-[clamp(1.7rem,4.4vw,3.6rem)]">
              <span>17 out</span>
              <span aria-hidden>|</span>
              <span>14H30</span>
            </div>
            <div className="space-y-5 font-serif text-[clamp(1.25rem,2.7vw,2.45rem)]">
              <div className="space-y-2">
                <h2>PAROQUIA SANTA CATARIA</h2>
                <AddressDialog
                  address="Rua Graciliano Ramos, 230, São Leopoldo"
                  label="Paróquia Santa Catarina"
                />
              </div>
              <p className="text-[clamp(1rem,2vw,1.7rem)]">RECEPÇÃO:</p>
              <div className="space-y-2">
                <h2>BLEST&nbsp;&nbsp; EVENTOS</h2>
                <AddressDialog
                  address="Rua Cedro, 39, Sapucaia do Sul"
                  label="Blest Eventos"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="confirmacao" className="ornate-page min-h-svh px-5 py-24">
          <div className="mx-auto flex min-h-[calc(100svh-12rem)] max-w-5xl flex-col items-center justify-center gap-10 text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={180}
              height={180}
              className="size-36 object-contain md:size-48"
            />
            <Dialog>
              <DialogTrigger render={<button className="wedding-pill" type="button" />}>
                Confirmar presença
              </DialogTrigger>
              <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto border-[#9aa07b]/50 bg-[#fbfaf5] p-6 sm:max-w-lg">
                <DialogTitle className="font-serif text-3xl text-[#161616]">
                  Confirme sua presença
                </DialogTitle>
                <DialogDescription className="font-serif text-base leading-relaxed text-[#5e604f]">
                  Conta pra gente seu nome e quem vai junto.
                </DialogDescription>
                <RsvpForm variant="plain" />
              </DialogContent>
            </Dialog>
            <p className="text-md font-semibold">Confirmação até dia 19/09</p>
            <a className="wedding-pill" href="#vestimenta">
              Informações de vestimenta
            </a>
            <a className="wedding-pill" href="#presentes">
              Lista de presentes
            </a>
          </div>
        </section>

        <section
          id="vestimenta"
          className="ornate-page dress-section min-h-svh px-4 py-12 md:px-5 md:py-24"
        >
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-6xl flex-col items-center justify-center text-center md:min-h-[calc(100svh-12rem)]">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={168}
              height={168}
              className="mb-3 size-20 object-contain md:mb-6 md:size-44"
            />
            <h2 className="dress-title mb-3" aria-label="Dress code">
              <span className="dress-title__script">Dress</span>
              <span className="dress-title__serif">code</span>
            </h2>
            <p className="mb-3 font-serif text-xl md:mb-6 md:text-3xl">Social</p>
            <p className="mb-5 max-w-3xl font-serif text-sm leading-snug sm:text-base md:mb-8 md:text-xl md:leading-relaxed">
              Queremos que todos se sintam a vontade, lindos e especiais nesse dia tão
              importante para nós.
            </p>
            <div className="dress-stage grid w-full grid-cols-[minmax(0,1.15fr)_auto_minmax(0,1.15fr)] items-end gap-1 sm:gap-4 md:gap-8">
              <div className="dress-copy dress-copy--ele space-y-1.5 md:space-y-4">
                <h3 className="script-heading">Eles</h3>
                <p className="mx-auto max-w-[9.2rem] font-serif text-[0.68rem] leading-tight sm:max-w-xs sm:text-sm sm:leading-snug md:text-xl">
                  Terno ou blazer com camisa social. Gravata é opcional, Também pode vir
                  com trage tipico gaucho.
                </p>
              </div>
              <div className="flex justify-center gap-0 sm:gap-2">
                <div className="dress-person dress-person--ele">
                  <Image
                    src="/ele.png"
                    alt="Traje masculino"
                    width={220}
                    height={420}
                    className="h-32 w-auto object-contain sm:h-48 md:h-96"
                  />
                </div>
                <div className="dress-person dress-person--ela">
                  <Image
                    src="/ela.png"
                    alt="Traje feminino"
                    width={220}
                    height={420}
                    className="h-32 w-auto object-contain sm:h-48 md:h-96"
                  />
                </div>
              </div>
              <div className="dress-copy dress-copy--ela space-y-1.5 md:space-y-4">
                <h3 className="script-heading">Elas</h3>
                <p className="mx-auto max-w-[9.2rem] font-serif text-[0.68rem] leading-tight sm:max-w-xs sm:text-sm sm:leading-snug md:text-xl">
                  Vestidos midi ou longos, macacões ou conjuntos. Cores e estampas são bem
                  vindas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="como-comprar" className="ornate-page min-h-svh px-5 py-24">
          <div className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-5xl flex-col items-center justify-center gap-8 text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={176}
              height={176}
              className="mx-auto size-32 object-contain md:size-40"
            />
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              <h2 className="gift-title" aria-label="Lista de presentes">
                <span className="gift-title__script">lista</span>
                <span className="gift-title__de">de</span>
                <span className="gift-title__serif">presentes</span>
              </h2>
              <p className="font-serif text-xl leading-relaxed md:text-2xl">
                Cada presente recebido fará parte da história que estamos começando a
                construir. Por isso, optamos por receber as contribuições via Pix.
              </p>
              <h3 className="pt-4 font-serif text-2xl font-semibold italic md:text-3xl">
                Como efetuar a compra
              </h3>
              <ol className="mx-auto max-w-5xl list-decimal space-y-2 pl-8 text-left text-lg leading-tight md:text-xl">
                <li>Escolha seu presente ou parte do valor do presente desejado</li>
                <li>Clique em “comprar” e realize o Pix através do seu banco.</li>
                <li>
                  Deixe uma mensagem de carinho para sabermos que foi o seu presente que
                  recebemos.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="presentes" className="ornate-page min-h-svh px-3 py-16 sm:px-5 md:py-24">
          <div className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-6xl flex-col justify-center gap-8 md:min-h-[calc(100svh-12rem)]">
            <div className="mx-auto max-w-4xl space-y-4 text-center">
              <h2 className="font-serif text-[clamp(2.25rem,6vw,4.6rem)] leading-none">
                Presentes
              </h2>
              <p className="font-serif text-base leading-relaxed text-[#5e604f] md:text-xl">
                Escolha uma cota e siga para o Pix no carrinho.
              </p>
            </div>

            <GiftList
              gifts={gifts.data}
              initialHasNextPage={gifts.pageInfo.hasNextPage}
              initialPage={gifts.pageInfo.page}
              perPage={gifts.pageInfo.perPage}
            />
          </div>
        </section>
      </main>
    </>
  )
}
