"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { confirmOrderPayment } from "@/modules/order/ui/order.action";

function isRedirectError(error: unknown) {
  return typeof error === "object" && error !== null && "digest" in error &&
    String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT");
}

type ConfirmPaymentFormProps = {
  orderId: string;
  isPaid: boolean;
};

export function ConfirmPaymentForm({ orderId, isPaid }: ConfirmPaymentFormProps) {
  const [isPending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      try {
        await confirmOrderPayment(formData);
      } catch (error) {
        if (isRedirectError(error)) throw error;
        toast.error("Não foi possível confirmar o pagamento. Tente novamente.");
      }
    });
  }

  return (
    <form action={submit}>
      <input name="orderId" type="hidden" value={orderId} />
      <Button
        className="h-auto min-h-12 w-full min-w-0 whitespace-normal rounded-full bg-[#3f4d2f] px-5 py-3 text-center font-serif text-base leading-snug text-[#fbfaf5] hover:bg-[#2f3b22]"
        disabled={isPaid || isPending}
        type="submit"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {isPaid
          ? "Pagamento já confirmado"
          : isPending
            ? "Confirmando..."
            : "Já realizou o pagamento? Confirme aqui para que outros convidados não comprem o mesmo presente"}
      </Button>
    </form>
  );
}
