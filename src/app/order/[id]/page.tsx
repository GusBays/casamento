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
    <main className="ornate-page min-h-svh px-4 py-24 text-[#161616]">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-7">
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

          <div className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl text-[#3f4d2f]">
                  {isPaid ? "Pagamento confirmado." : "Pedido criado."}
                </p>
                <p className="mt-2 break-all text-xs text-[#5e604f]">Pedido: {order.id}</p>
              </div>
              <p className="rounded-full bg-[#eef0e3] px-4 py-2 font-serif text-xl text-[#28351f]">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
            <h2 className="font-serif text-2xl">Itens comprados</h2>
            <div className="mt-4">
              <OrderItemsSummary items={order.items} />
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between font-serif text-xl">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <ConfirmPaymentForm isPaid={isPaid} orderId={order.id} />
        </div>

        <aside className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/90 p-5 shadow-sm">
          <OrderPixPanel pixPayload={payment?.pix_payload ?? null} />
        </aside>
      </section>
    </main>
  );
}
