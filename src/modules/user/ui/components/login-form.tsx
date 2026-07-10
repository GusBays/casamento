'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  loginFormSchema,
  type LoginFormInput
} from '@/modules/user/core/domain/user.schema'
import { loginUser } from '@/modules/user/ui/user.action'

function isRedirectError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String((error as { digest?: unknown }).digest).startsWith('NEXT_REDIRECT')
  )
}

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  function submit(values: LoginFormInput) {
    startTransition(async () => {
      try {
        await loginUser(values)
      } catch (error) {
        if (isRedirectError(error)) throw error
        toast.error('Não foi possível entrar.')
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          autoComplete="username"
          aria-invalid={!!form.formState.errors.username}
          {...form.register('username')}
        />
        {form.formState.errors.username ? (
          <p className="text-xs text-destructive">{form.formState.errors.username.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!form.formState.errors.password}
          {...form.register('password')}
        />
        {form.formState.errors.password ? (
          <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
        ) : null}
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        <LogIn className="size-4" aria-hidden />
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
