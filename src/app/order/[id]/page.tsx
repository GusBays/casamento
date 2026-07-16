import { notFound } from "next/navigation";

import { BackHomeLink } from "@/common/components/back-home-link";
import { OrderItemsSummary } from "@/common/components/order-items-summary";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import { getOneOrder } from "@/modules/order/ui/order.action";
import { OrderPixPanel } from "@/modules/order/ui/components/order-pix-panel";
import { ConfirmPaymentForm } from "@/modules/order/ui/components/confirm-payment-form";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOneOrder(id).catch(() => null);

  if (!order) notFound();

  const payment = Array.isArray(order.payment) ? order.payment[0] : order.payment;
  const isPaid = order.status === "paid" || payment?.status === "paid";

  return (
    <main className="ornate-page min-h-svh overflow-x-hidden px-3 py-16 text-[#161616] sm:px-4 sm:py-24">
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-8">
        <div className="min-w-0 space-y-7">
          <BackHomeLink />
          <div className="space-y-4">
            <p className="wedding-kicker">Pedido</p>
            <h1 className="font-serif text-4xl leading-none md:text-5xl">
              Finalize seu Pix.
            </h1>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-[#38382f]">
              Depois do pagamento, confirme aqui para reservar os presentes no nosso controle.
            </p>
          </div>

          <div className="min-w-0 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-4 shadow-sm sm:p-5">
            <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div className="min-w-0">
                <p className="font-serif text-2xl text-[#3f4d2f]">
                  {isPaid ? "Pagamento confirmado." : "Pedido criado."}
                </p>
                <p className="mt-2 break-all text-xs text-[#5e604f]">Pedido: {order.id}</p>
              </div>
              <p className="max-w-full rounded-full bg-[#eef0e3] px-4 py-2 font-serif text-xl text-[#28351f]">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-4 shadow-sm sm:p-5">
            <h2 className="font-serif text-2xl">Itens comprados</h2>
            <div className="mt-4">
              <OrderItemsSummary items={order.items} />
            </div>
            <Separator className="my-4" />
            <div className="flex min-w-0 items-center justify-between gap-4 font-serif text-xl">
              <span>Total</span>
              <span className="shrink-0">{formatCurrency(order.total)}</span>
            </div>
          </div>

          <ConfirmPaymentForm isPaid={isPaid} orderId={order.id} />
        </div>

        <aside className="min-w-0 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/90 p-4 shadow-sm sm:p-5">
          <OrderPixPanel pixPayload={payment?.pix_payload ?? null} />
        </aside>
      </section>
    </main>
  );
}
