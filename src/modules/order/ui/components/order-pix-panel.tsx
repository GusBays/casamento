"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";

type OrderPixPanelProps = {
  pixPayload: string | null;
};

export function OrderPixPanel({ pixPayload }: OrderPixPanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyPixPayload() {
    if (!pixPayload) return;

    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
  }

  if (!pixPayload) {
    return (
      <div className="rounded-lg border border-[#9aa07b]/35 bg-[#fbfaf5]/80 p-5 text-sm leading-6 text-[#5e604f]">
        Pix ainda não configurado. Confira `PIX_KEY`, `PIX_RECEIVER_NAME` e
        `PIX_RECEIVER_CITY` no ambiente.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="mx-auto w-full max-w-40 rounded-lg border border-[#9aa07b]/35 bg-white p-3 sm:max-w-56 sm:p-4">
        <QRCodeSVG value={pixPayload} className="h-auto w-full" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#606d42]">
          Pix copia e cola
        </p>
        <p className="max-h-36 overflow-y-auto break-all rounded-lg bg-[#eef0e3] p-3 text-xs leading-5 text-[#28351f]">
          {pixPayload}
        </p>
      </div>
      <Button
        className="h-11 w-full rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]"
        onClick={copyPixPayload}
        type="button"
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {copied ? "Código copiado" : "Copiar código Pix"}
      </Button>
    </div>
  );
}
