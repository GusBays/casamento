'use client'

import { Check, Mail, Send, UserRound } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { confirmRsvp, type RsvpFormState } from '@/modules/rsvp/ui/rsvp.action'

const initialState: RsvpFormState = {
  status: 'idle'
}

type RsvpFormProps = {
  variant?: 'card' | 'plain'
}

export function RsvpForm({ variant = 'card' }: RsvpFormProps) {
  const [state, formAction, isPending] = useActionState(confirmRsvp, initialState)

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Presença confirmada. Obrigado!')
    }

    if (state.status === 'error') {
      toast.error(state.message ?? 'Não foi possível confirmar presença.')
    }
  }, [state.message, state.status])

  const form = (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="guestName">Seu nome</Label>
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="guestName"
            name="guestName"
            placeholder="Nome e sobrenome"
            defaultValue={state.fields?.guestName}
            autoComplete="name"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guestEmail">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="guestEmail"
            name="guestEmail"
            type="email"
            placeholder="voce@email.com"
            defaultValue={state.fields?.guestEmail}
            autoComplete="email"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companions">Nomes do convite</Label>
        <Input
          id="companions"
          name="companions"
          placeholder="Ex: Cônjuge e filhos"
          defaultValue={state.fields?.companions}
        />
        <p className="text-sm leading-6 text-muted-foreground">
          Se for apenas você, pode deixar em branco.
        </p>
      </div>

      {state.status === 'error' ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possivel confirmar</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {state.status === 'success' ? (
        <Alert>
          <Check className="size-4" aria-hidden />
          <AlertTitle>Presenca confirmada</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Button className="w-full sm:w-auto" size="lg" type="submit" disabled={isPending}>
        <Send className="size-4" aria-hidden />
        {isPending ? 'Confirmando...' : 'Confirmar'}
      </Button>
    </form>
  )

  if (variant === 'plain') return form

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Confirmar presenca</CardTitle>
      </CardHeader>
      <CardContent>{form}</CardContent>
    </Card>
  )
}
