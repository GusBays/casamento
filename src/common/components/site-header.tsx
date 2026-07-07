import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link className="text-sm font-semibold tracking-[0.24em] uppercase" href="/">
          G + A
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            href="/#historia"
          >
            Historia
          </Link>
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            href="/presentes"
          >
            Presentes
          </Link>
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            href="/confirmar-presenca"
          >
            Presenca
          </Link>
          <Link className={buttonVariants({ size: 'sm' })} href="/checkout">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  )
}
