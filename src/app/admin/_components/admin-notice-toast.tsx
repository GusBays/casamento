'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

const messages: Record<string, string> = {
  'gift-created': 'Presente cadastrado.',
  'gift-updated': 'Presente atualizado.',
  'gift-not-found': 'Presente não encontrado.'
}

type AdminNoticeToastProps = {
  notice?: string
}

export function AdminNoticeToast({ notice }: AdminNoticeToastProps) {
  useEffect(() => {
    if (!notice) return

    const message = messages[notice]
    if (message) toast(message)
  }, [notice])

  return null
}
