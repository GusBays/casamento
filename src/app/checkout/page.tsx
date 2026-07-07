import { QRCodeSVG } from "qrcode.react";
import { Mail, ShieldCheck } from "lucide-react";

import { SiteHeader } from "@/common/components/site-header";
import { gifts, formatCurrency } from "@/common/data/gifts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type CheckoutPageProps = {
  searchParams: Promise<{ gift?: string }>;
};

const fallbackPixPayload = "00020126580014br.gov.bcb.pix0136gustavo-e-ana@example.com5204000053039865406350.005802BR5912GUSTAVO ANA6009SAO PAULO62070503***6304ABCD";

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const selectedGift = gifts.find((gift) => gift.id === params.gift) ?? gifts[0];
  const total = selectedGift.priceCents;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-12 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-[0.24em] text-rose-700 uppercase">
              Checkout Pix
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">Confirme seu presente.</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Informe seu email para receber a confirmacao quando o pagamento for identificado.
            </p>
          </div>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Dados do convidado</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="voce@email.com" className="pl-9" />
                </div>
              </div>
              <Alert>
                <ShieldCheck className="size-4" aria-hidden />
                <AlertTitle>Pagamento seguro</AlertTitle>
                <AlertDescription>
                  Esta tela ainda usa um Pix de exemplo. A proxima etapa e criar o pedido no
                  Supabase e gerar o payload real no servidor.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="font-medium">{selectedGift.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">{selectedGift.description}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="rounded-md border bg-white p-4">
                <QRCodeSVG value={fallbackPixPayload} className="h-auto w-full" />
              </div>
              <p className="break-all rounded-md bg-muted p-3 text-xs leading-5 text-muted-foreground">
                {fallbackPixPayload}
              </p>
              <Button className="w-full">Copiar codigo Pix</Button>
            </CardContent>
          </Card>
        </aside>
      </main>
    </>
  );
}
