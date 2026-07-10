import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { z } from '@/lib/zod'

import { buttonVariants } from '@/components/ui/button'
import { getGift } from '@/modules/gift/core/domain/gift.service'
import { DeleteGiftButton } from '@/modules/gift/ui/components/delete-gift-button'
import { AdminGiftForm } from '@/modules/gift/ui/components/admin-gift-form'

type AdminGiftDetailPageProps = {
  id: string
}

export async function AdminGiftDetailPage({ id }: AdminGiftDetailPageProps) {
  const isNew = id === 'new'
  const gift = isNew
    ? undefined
    : z.uuid().safeParse(id).success
      ? await getGift(id).catch(() => null)
      : null

  if (!isNew && !gift) redirect('/admin/presents?notice=gift-not-found')

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            aria-label="Voltar para presentes"
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            href="/admin/presents"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">Presentes</p>
            <h1 className="text-2xl font-semibold">
              {isNew ? 'Novo presente' : 'Detalhe do presente'}
            </h1>
          </div>
        </div>
        {gift ? <DeleteGiftButton giftId={gift.id} /> : null}
      </header>

      <section className="grid items-start rounded-lg border bg-background p-5">
        <AdminGiftForm gift={gift ?? undefined} />
      </section>
    </div>
  )
}
