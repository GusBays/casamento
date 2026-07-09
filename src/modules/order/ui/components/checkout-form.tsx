"use client";

import { useTransition } from "react";
import { Loader2, Mail, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { finishCheckout } from "@/modules/order/ui/order.action";

function isRedirectError(error: unknown) {
  return typeof error === "object" && error !== null && "digest" in error &&
    String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT");
}

type CheckoutFormProps = {
  disabled: boolean;
};

export function CheckoutForm({ disabled }: CheckoutFormProps) {
  const [isPending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      try {
        await finishCheckout(formData);
      } catch (error) {
        if (isRedirectError(error)) throw error;
        toast.error("Não foi possível finalizar o pedido. Confira os dados e tente novamente.");
      }
    });
  }

  return (
    <form action={submit} className="grid gap-5">
      <section className="grid gap-5 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl">Cadastro</h2>
          <p className="text-sm leading-6 text-[#5e604f]">
            Seus dados ajudam a gente a identificar o presente.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="guest_name">Nome</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#606d42]" />
            <Input id="guest_name" name="guest_name" placeholder="Seu nome" className="h-11 pl-10" required />
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
              required
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
      </section>

      <section className="grid gap-5 rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl">Mensagem do pedido</h2>
          <p className="text-sm leading-6 text-[#5e604f]">
            Deixe um recado para sabermos que este presente veio de você.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="note">Mensagem para os noivos</Label>
          <textarea
            id="note"
            name="note"
            className="min-h-32 rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            placeholder="Deixe uma mensagem de carinho"
          />
        </div>
      </section>

      <Button
        className="h-11 rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]"
        disabled={disabled || isPending}
        type="submit"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {isPending ? "Finalizando..." : "Finalizar pedido"}
      </Button>
    </form>
  );
}
