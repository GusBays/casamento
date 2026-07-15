"use client"

import { Check, Copy, Map, Navigation } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type AddressDialogProps = {
  address: string
  label: string
}

export function AddressDialog({ address, label }: AddressDialogProps) {
  const [copied, setCopied] = useState(false)
  const encodedAddress = encodeURIComponent(address)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast.success("Endereço copiado.")
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error("Não foi possível copiar o endereço.")
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            className="mx-auto block max-w-full text-[clamp(1rem,2.1vw,1.85rem)] underline underline-offset-4"
            type="button"
          />
        }
      >
        {address}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto border-[#9aa07b]/50 bg-[#fbfaf5] p-5 text-[#161616] sm:max-w-xl">
        <DialogTitle className="pr-8 font-serif text-2xl text-[#161616]">
          {label}
        </DialogTitle>
        <DialogDescription className="font-serif text-base leading-relaxed text-[#5e604f]">
          {address}
        </DialogDescription>

        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[#9aa07b]/45 bg-[#eef0e3]">
          <iframe
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
            title={`Mapa de ${label}`}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <a
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 rounded-full bg-[#3f4d2f] font-serif text-base text-[#fbfaf5] hover:bg-[#2f3b22]"
            )}
            href={wazeUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Navigation className="size-4" aria-hidden />
            Abrir no Waze
          </a>
          <a
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full border-[#1e1e1c] font-serif text-base"
            )}
            href={mapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Map className="size-4" aria-hidden />
            Abrir no Maps
          </a>
          <Button
            className="h-11 rounded-full border-[#1e1e1c] font-serif text-base sm:col-span-2"
            onClick={copyAddress}
            type="button"
            variant="outline"
          >
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            Copiar endereço
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
