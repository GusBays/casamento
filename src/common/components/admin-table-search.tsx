'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group'

type AdminTableSearchProps = {
  placeholder?: string
}

export function AdminTableSearch({
  placeholder = 'Buscar registros...'
}: AdminTableSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    setValue(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams)
      const q = value.trim()
      const currentQ = searchParams.get('q') ?? ''

      if (currentQ === q) return

      if (q) {
        nextParams.set('q', q)
      } else {
        nextParams.delete('q')
      }

      nextParams.set('page', '1')
      router.push(`?${nextParams.toString()}`)
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [router, searchParams, value])

  return (
    <InputGroup className="max-w-md">
      <InputGroupAddon>
        <Search className="size-4" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Buscar"
        placeholder={placeholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </InputGroup>
  )
}
