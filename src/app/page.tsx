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
      <main className="overflow-x-hidden bg-[#f4ecdf] text-[#161616]">
        <section
          id="inicio"
          className="relative grid h-svh place-items-center overflow-hidden bg-[#efe5d5]"
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

        <section id="convite" className="ornate-page px-5 py-10">
          <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-start pt-3 text-center md:pt-6">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={220}
              height={220}
              className="mb-6 size-36 object-contain sm:size-40 md:size-52"
            />
            <p className="max-w-4xl font-serif text-[clamp(1.15rem,2.7vw,2.35rem)] leading-tight">
              Convidamos você para o nosso casamento
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

        <section id="confirmacao" className="ornate-page px-5 py-10">
          <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-5xl flex-col items-center justify-center gap-8 text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={220}
              height={220}
              className="size-36 object-contain sm:size-40 md:size-52"
            />
            <p className="font-serif text-xl font-semibold md:text-3xl">
              Confirmação até dia 19/09
            </p>
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
            <a className="wedding-pill" href="#vestimenta">
              Informações de vestimenta
            </a>
            <a className="wedding-pill" href="#presentes">
              Lista de presentes
            </a>
          </div>
        </section>

        <section id="vestimenta" className="ornate-page dress-section px-4 md:px-5">
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col items-center justify-center text-center md:min-h-[calc(100svh-10rem)]">
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
              <div className="dress-copy dress-copy--ele mb-2 space-y-1.5 pt-10 md:mb-5 md:space-y-4 md:pt-28">
                <h3 className="script-heading">Eles</h3>
                <p className="mx-auto max-w-[9.2rem] font-serif text-[0.68rem] leading-tight sm:max-w-xs sm:text-sm sm:leading-snug md:text-xl">
                  Terno ou blazer com camisa social. Gravata é opcional, Também pode vir
                  com trage tipico gaucho.
                </p>
              </div>
              <div className="-mt-6 flex justify-center gap-0 self-start sm:-mt-8 sm:gap-2 md:-mt-14">
                <div className="dress-person dress-person--ele">
                  <Image
                    src="/ele.png"
                    alt="Traje masculino"
                    width={220}
                    height={420}
                    className="h-36 w-auto object-contain sm:h-52 md:h-[26rem]"
                  />
                </div>
                <div className="dress-person dress-person--ela">
                  <Image
                    src="/ela.png"
                    alt="Traje feminino"
                    width={220}
                    height={420}
                    className="h-36 w-auto object-contain sm:h-52 md:h-[26rem]"
                  />
                </div>
              </div>
              <div className="dress-copy dress-copy--ela mb-2 space-y-1.5 pt-10 md:mb-5 md:space-y-4 md:pt-28">
                <h3 className="script-heading">Elas</h3>
                <p className="mx-auto max-w-[9.2rem] font-serif text-[0.68rem] leading-tight sm:max-w-xs sm:text-sm sm:leading-snug md:text-xl">
                  Vestidos midi ou longos, macacões ou conjuntos. Cores e estampas são bem
                  vindas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="como-comprar" className="ornate-page px-5 py-10">
          <div className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-5xl flex-col items-center justify-center gap-8 text-center">
            <Image
              src="/logo.png"
              alt="Logo Gustavo e Ana"
              width={220}
              height={220}
              className="mx-auto size-36 object-contain sm:size-40 md:size-52"
            />
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              <h2 className="gift-title" aria-label="Lista de presentes">
                <span className="gift-title__script">lista</span>
                <span className="gift-title__de">de</span>
                <span className="gift-title__serif">presentes</span>
              </h2>
              <p className="font-serif text-md leading-relaxed md:text-xl">
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

        <section id="presentes" className="ornate-page px-3 sm:px-5 py-10">
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
