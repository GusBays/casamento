import { Church, Wine } from 'lucide-react'
import Image from 'next/image'

import { AddressDialog } from '@/common/components/address-dialog'
import { CountdownTimer } from '@/common/components/countdown-timer'
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

        <section id="convite" className="wedding-info-section relative">
          <div className="wedding-info">
            <div className="wedding-info__date">
              <span>17 out</span>
              <span aria-hidden>|</span>
              <span>14H30</span>
            </div>

            <div className="wedding-info__details">
              <div className="wedding-info__reception">
                <p className="wedding-info__label">RECEPÇÃO:</p>
                <div>
                  <h2>BLEST EVENTOS</h2>
                  <AddressDialog
                    address="Rua Cedro, 39, Sapucaia do Sul"
                    label="Rua Cedro, 39, Sapucaia do Sul"
                  />
                </div>
              </div>

              <div className="wedding-info__divider" aria-hidden />

              <div className="wedding-info__ceremony">
                <div className="wedding-info__icon" aria-hidden>
                  <Church strokeWidth={1.25} />
                </div>
                <div className="wedding-info__copy">
                  <p className="wedding-info__label">CERIMONIA:</p>
                  <h2>PAROQUIA SANTA CATARIA</h2>
                  <AddressDialog
                    address="Rua Graciliano Ramos, 230, São Leopoldo"
                    label="Rua Graciliano Ramos, 230, São Leopoldo"
                  />
                </div>
                <div className="wedding-info__toast" aria-hidden>
                  <Wine strokeWidth={1.2} />
                  <Wine strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="wedding-photo-section relative"
          aria-label="Foto do casamento"
        >
          <Image src="/2.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </section>

        <section id="confirmacao" className="wedding-confirm-section relative">
          <Image src="/3.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="wedding-confirm-panel">
            <div className="wedding-confirm-heading">
              <h2>Clique no botão</h2>
              <p>confirmação até dia 19/09</p>
            </div>
            <Dialog>
              <DialogTrigger
                render={<button className="wedding-arch-button" type="button" />}
              >
                Confirme sua presença
              </DialogTrigger>
              <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto border-[#9aa07b]/50 bg-[#fbfaf5] p-6 sm:max-w-lg">
                <DialogTitle className="font-serif text-3xl text-[#161616]">
                  Confirme sua presença
                </DialogTitle>
                <DialogDescription className="font-serif text-base leading-relaxed text-[#5e604f]">
                  Digite seu nome e os demais do convite.
                </DialogDescription>
                <RsvpForm variant="plain" />
              </DialogContent>
            </Dialog>
            <a className="wedding-arch-button" href="#vestimenta">
              Informações de vestimenta
            </a>
            <a className="wedding-arch-button" href="#presentes">
              Lista de presentes
            </a>
          </div>
        </section>

        <section id="contagem" className="wedding-countdown-section relative">
          <div className="wedding-countdown-panel">
            <div className="wedding-countdown-clock">
              <CountdownTimer />
            </div>
            <a className="wedding-countdown-button" href="#confirmacao">
              Confirme sua presença
            </a>
          </div>
        </section>

        <section id="vestimenta" className="dress-envelope-section relative">
          <Image src="/5.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="dress-envelope-copy">
            <h2 className="dress-envelope-title" aria-label="Dress code">
              <span className="dress-envelope-title__script">Dress</span>
              <span className="dress-envelope-title__serif">code</span>
            </h2>
            <p className="dress-envelope-social">Social</p>
            <p className="dress-envelope-text">
              Queremos que todos se sintam a vontade, lindos e especiais nesse dia tão
              importante para nós.
            </p>
          </div>
        </section>

        <section className="dress-guide-section relative" aria-label="Trajes sugeridos">
          <Image src="/6.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="dress-guide">
            <div className="dress-guide__column dress-guide__column--ele">
              <Image
                src="/ele.png"
                alt="Traje masculino"
                width={675}
                height={1200}
                className="dress-guide__person dress-guide__person--ele"
              />
              <h3 className="script-heading">Eles</h3>
              <p>
                Terno ou blazer com camisa social. Gravata é opcional, Também pode vir com
                trage tipico gaucho.
              </p>
            </div>
            <div className="dress-guide__column dress-guide__column--ela">
              <Image
                src="/ela.png"
                alt="Traje feminino"
                width={736}
                height={1308}
                className="dress-guide__person dress-guide__person--ela"
              />
              <h3 className="script-heading">Elas</h3>
              <p>
                Vestidos midi ou longos, macacões ou conjuntos. Cores e estampas são bem
                vindas
              </p>
            </div>
          </div>
        </section>

        <section id="como-comprar" className="gift-intro-section relative">
          <Image src="/7.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="gift-intro-copy">
            <h2 className="gift-title" aria-label="Lista de presentes">
              <span className="gift-title__script">lista</span>
              <span className="gift-title__de">de</span>
              <span className="gift-title__serif">presentes</span>
            </h2>
            <p>
              Cada presente recebido fará parte da história que estamos começando a
              construir. Por isso, optamos por receber as contribuições via Pix.
            </p>
          </div>
        </section>

        <section className="purchase-guide-section relative">
          <Image src="/8.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="purchase-guide-copy">
            <h3>Como efetuar a compra</h3>
            <ol>
              <li>Escolha seu presente ou parte do valor do presente desejado</li>
              <li>Clique em “comprar” e realize o pix atraves do seu banco.</li>
              <li>
                deixe uma mensagem de carinho para sabermos que foi o seu presente que
                recebemos.
              </li>
            </ol>
          </div>
        </section>

        <section
          id="presentes"
          className="ornate-page relative px-3 py-16 sm:px-5 md:py-24"
        >
          <Image src="/9.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-6xl flex-col items-center justify-center gap-10 text-center md:min-h-[calc(100svh-12rem)] md:gap-14">
            <div className="mx-auto max-w-4xl space-y-4 text-center">
              <h2 className="font-serif text-[clamp(2.25rem,6vw,4.6rem)] leading-none">
                Presentes
              </h2>
              <p className="font-serif text-base leading-relaxed text-[#5e604f] md:text-xl">
                Escolha uma cota e siga para o Pix no carrinho.
              </p>
            </div>

            <div className="w-full text-left">
              <GiftList
                gifts={gifts.data}
                initialHasNextPage={gifts.pageInfo.hasNextPage}
                initialPage={gifts.pageInfo.page}
                perPage={gifts.pageInfo.perPage}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
