'use client'

import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { deleteGiftAdminAction } from '@/modules/gift/ui/gift.action'

type DeleteGiftButtonProps = {
  giftId: string
}

export function DeleteGiftButton({ giftId }: DeleteGiftButtonProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Trash2 className="size-4" aria-hidden />
        Remover
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover presente?</DialogTitle>
          <DialogDescription>
            Esta ação remove o presente da lista. Pedidos antigos continuam com o item
            registrado no histórico.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <form action={deleteGiftAdminAction}>
            <input type="hidden" name="giftId" value={giftId} />
            <Button variant="destructive" type="submit">
              <Trash2 className="size-4" aria-hidden />
              Remover presente
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
