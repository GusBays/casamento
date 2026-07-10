import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/modules/user/core/domain/user.service'
import { LoginForm } from '@/modules/user/ui/components/login-form'

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const [params, user] = await Promise.all([searchParams, getCurrentUser()])

  if (user) redirect('/admin/presents')

  return (
    <main className="grid min-h-svh place-items-center bg-muted/30 px-4">
      <section className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-sm">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Painel administrativo</p>
          <h1 className="text-2xl font-semibold">Entrar</h1>
        </div>

        {params.error ? (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Usuário ou senha inválidos.
          </p>
        ) : null}

        <LoginForm />
      </section>
    </main>
  )
}
