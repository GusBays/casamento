import { QRCodeSVG } from "qrcode.react";
import { Mail, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import { finishCheckout } from "@/modules/order/ui/order.action";

type CheckoutClientProps = {
  pixKey: string;
  pixQrCode: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalCents: number;
  orderId?: string;
};

export function CheckoutClient({ pixKey, pixQrCode, items, totalCents, orderId }: CheckoutClientProps) {
  const qrValue = pixQrCode || pixKey || "PIX_AGUARDANDO_CONFIGURACAO";
  const hasItems = items.length > 0;

  return (
    <main className="ornate-page min-h-svh px-4 py-24 text-[#161616]">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="wedding-kicker">Checkout Pix</p>
            <h1 className="font-serif text-4xl leading-none md:text-5xl">Confirme seu presente.</h1>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-[#38382f]">
              Informe seus dados e deixe uma mensagem de carinho para sabermos qual foi o seu
              presente.
            </p>
          </div>

          {orderId ? (
            <div className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
              <p className="font-serif text-2xl text-[#3f4d2f]">Pedido criado.</p>
              <p className="mt-2 text-sm leading-6 text-[#5e604f]">
                Agora é só fazer o Pix. Os presentes não serão marcados automaticamente; depois,
                vocês podem marcar manualmente como comprado no banco.
              </p>
              <p className="mt-4 break-all text-xs text-[#5e604f]">Pedido: {orderId}</p>
            </div>
          ) : (
          <form action={finishCheckout} className="grid gap-5 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
            <div className="grid gap-2">
              <Label htmlFor="guest_name">Nome</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#606d42]" />
                <Input id="guest_name" name="guest_name" placeholder="Seu nome" className="h-11 pl-10" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guest_email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#606d42]" />
                <Input
                  id="guest_email"
                  name="guest_email"
                  placeholder="voce@email.com"
                  className="h-11 pl-10"
                  type="email"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guest_phone">Telefone</Label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#606d42]" />
                <Input
                  id="guest_phone"
                  name="guest_phone"
                  placeholder="(51) 99999-9999"
                  className="h-11 pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order_note">Mensagem para os noivos</Label>
              <textarea
                id="order_note"
                name="order_note"
                className="min-h-32 rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                placeholder="Deixe uma mensagem de carinho"
              />
            </div>
            <Button
              className="h-11 rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]"
              disabled={!hasItems}
              type="submit"
            >
              Finalizar pedido
            </Button>
          </form>
          )}
        </div>

        <aside className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/90 p-5 shadow-sm">
          <div className="space-y-5">
            <h2 className="font-serif text-2xl">Resumo</h2>
            {items.length === 0 ? (
              <p className="text-sm leading-6 text-[#5e604f]">
                Nenhum item no carrinho. Volte para a lista de presentes e escolha uma contribuição.
              </p>
            ) : (
              <ul className="divide-y divide-[#9aa07b]/25">
                {items.map((item) => (
                  <li className="flex justify-between gap-4 py-3 text-sm" key={item.id}>
                    <span>{item.quantity} x {item.name}</span>
                    <span>{formatCurrency(item.total)}</span>
                  </li>
                ))}
              </ul>
            )}

            <Separator />
            <div className="flex items-center justify-between font-serif text-xl">
              <span>Total</span>
              <span>{formatCurrency(totalCents)}</span>
            </div>

            <div className="rounded-lg border border-[#9aa07b]/35 bg-white p-4">
              <QRCodeSVG value={qrValue} className="h-auto w-full" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#606d42]">
                Chave Pix
              </p>
              <p className="break-all rounded-lg bg-[#eef0e3] p-3 text-sm leading-6 text-[#28351f]">
                {pixKey}
              </p>
            </div>
            <Button className="h-11 w-full rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]">
              Copiar chave Pix
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}
