'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { RecordFormWrapper } from '@/common/components/record-form-wrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  giftFormSchema,
  type Gift,
  type GiftFormInput,
  type GiftFormOutput
} from '@/modules/gift/core/domain/gift.schema'
import { saveGiftAction } from '@/modules/gift/ui/gift.action'

type AdminGiftFormProps = {
  gift?: Gift
}

function isRedirectError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String((error as { digest?: unknown }).digest).startsWith('NEXT_REDIRECT')
  )
}

export function AdminGiftForm({ gift }: AdminGiftFormProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<GiftFormInput, unknown, GiftFormOutput>({
    resolver: zodResolver(giftFormSchema),
    mode: 'onChange',
    defaultValues: {
      id: gift?.id ?? 'new',
      name: gift?.name ?? '',
      price: gift?.price ?? undefined,
      image: gift?.image ?? '',
      quotes: gift?.quotes ?? 1,
      remaining: gift?.remaining ?? 1,
      status: gift?.status ?? 'available'
    }
  })
  const imagePreview = useWatch({
    control: form.control,
    name: 'image'
  })

  function submit(values: GiftFormOutput) {
    startTransition(async () => {
      try {
        await saveGiftAction(values)
      } catch (error) {
        if (isRedirectError(error)) throw error
        toast.error('Não foi possível salvar o presente.')
      }
    })
  }

  return (
    <RecordFormWrapper
      form={form}
      onSave={submit}
      onDiscard={() => form.reset()}
      isLoading={isPending}
    >
      <input type="hidden" {...form.register('id')} />

      <div className="grid gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" aria-invalid={!!form.formState.errors.name} {...form.register('name')} />
        {form.formState.errors.name ? (
          <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="price">Valor</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            aria-invalid={!!form.formState.errors.price}
            {...form.register('price')}
          />
          {form.formState.errors.price ? (
            <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quotes">Cotas</Label>
          <Input
            id="quotes"
            type="number"
            min="1"
            aria-invalid={!!form.formState.errors.quotes}
            {...form.register('quotes')}
          />
          {form.formState.errors.quotes ? (
            <p className="text-xs text-destructive">{form.formState.errors.quotes.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="remaining">Restantes</Label>
          <Input
            id="remaining"
            type="number"
            min="0"
            aria-invalid={!!form.formState.errors.remaining}
            {...form.register('remaining')}
          />
          {form.formState.errors.remaining ? (
            <p className="text-xs text-destructive">{form.formState.errors.remaining.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Imagem</Label>
        <Input id="image" type="url" placeholder="https://..." {...form.register('image')} />
        <div className="overflow-hidden rounded-lg border bg-muted/40">
          {imagePreview ? (
            <div
              aria-label="Preview do presente"
              className="aspect-video w-full bg-cover bg-center"
              role="img"
              style={{ backgroundImage: `url("${imagePreview}")` }}
            />
          ) : (
            <div className="grid aspect-video place-items-center text-sm text-muted-foreground">
              Preview da imagem
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select
          className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          id="status"
          {...form.register('status')}
        >
          <option value="available">Disponível</option>
          <option value="reserved">Reservado</option>
          <option value="purchased">Comprado</option>
        </select>
      </div>
    </RecordFormWrapper>
  )
}
