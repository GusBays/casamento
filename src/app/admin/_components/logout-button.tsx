'use client'

import { LogOut } from 'lucide-react'

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
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { logoutUser } from '@/modules/user/ui/user.action'

export function LogoutButton() {
  return (
    <Dialog>
      <DialogTrigger render={<SidebarMenuButton tooltip="Sair" />}>
        <LogOut aria-hidden />
        <span>Sair</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sair do admin?</DialogTitle>
          <DialogDescription>Você precisará fazer login novamente para gerenciar o site.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <form action={logoutUser}>
            <Button type="submit" variant="destructive">
              <LogOut className="size-4" aria-hidden />
              Sair
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
