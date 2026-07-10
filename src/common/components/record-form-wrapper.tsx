'use client'

import type { ReactNode } from 'react'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { RotateCcw, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'

type RecordFormWrapperProps<TFieldValues extends FieldValues, TSubmitValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, unknown, TSubmitValues>
  onSave: SubmitHandler<TSubmitValues>
  onDiscard: () => void
  isLoading?: boolean
  children: ReactNode
}

export function RecordFormWrapper<
  TFieldValues extends FieldValues,
  TSubmitValues extends FieldValues = TFieldValues
>({
  form,
  onSave,
  onDiscard,
  isLoading = false,
  children
}: RecordFormWrapperProps<TFieldValues, TSubmitValues>) {
  const { isDirty, isValid } = form.formState

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="grid gap-5 pb-24">
      {children}

      {isDirty ? (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-lg border bg-background p-3 shadow-lg">
            <p className="text-sm text-muted-foreground">Alterações não salvas</p>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={onDiscard} disabled={isLoading}>
                <RotateCcw className="size-4" aria-hidden />
                Descartar
              </Button>
              <Button type="submit" disabled={!isValid || isLoading}>
                <Save className="size-4" aria-hidden />
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  )
}
