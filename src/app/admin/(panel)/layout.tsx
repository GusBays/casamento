import { AdminSidebar } from '@/app/admin/_components/admin-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { requireUser } from '@/modules/user/core/domain/user.service'

export default async function AdminPanelLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireUser()

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-muted/20 text-foreground">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />
          <div>
            <p className="text-sm font-medium">Painel administrativo</p>
          </div>
        </header>
        <section className="min-w-0 flex-1 px-4 py-6 md:px-8">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  )
}
