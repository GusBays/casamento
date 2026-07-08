import { SiteHeader } from "@/common/components/site-header";
import { getCurrentCart } from "@/modules/cart/ui/cart.action";
import { CheckoutClient } from "@/modules/order/ui/components/checkout-client";
import { getOneOrder } from "@/modules/order/ui/order.action";

const fallbackPixKey = "Chave Pix será configurada em breve";
const fallbackPixQrCode = "PIX_AGUARDANDO_CONFIGURACAO";

type CheckoutPageProps = {
  searchParams: Promise<{ pedido?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { pedido } = await searchParams;
  const pixKey = process.env.PIX_KEY ?? process.env.NEXT_PUBLIC_PIX_KEY ?? fallbackPixKey;
  const pixQrCode =
    process.env.PIX_QR_CODE ?? process.env.PIX_PAYLOAD ?? process.env.NEXT_PUBLIC_PIX_QR_CODE ?? fallbackPixQrCode;
  const order = pedido ? await getOneOrder(pedido) : null;
  const cart = order ? null : await getCurrentCart();
  const items = order?.items ?? cart?.items ?? [];
  const totalCents = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      <SiteHeader />
      <CheckoutClient
        items={items}
        orderId={order?.id}
        pixKey={pixKey}
        pixQrCode={pixQrCode}
        totalCents={totalCents}
      />
    </>
  );
}
