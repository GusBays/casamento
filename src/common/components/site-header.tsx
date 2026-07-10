import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { CartSheet } from "@/modules/cart/ui/components/cart-sheet";
import { getCurrentCart } from "@/modules/cart/ui/cart.action";

export async function SiteHeader() {
  const cart = await getCurrentCart();
  const items = cart?.items ?? [];
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#9aa07b]/25 bg-[#fbfaf5]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4">
        <Link className="flex items-center gap-2" href="/#inicio" aria-label="Gustavo e Ana">
          <Image
            src="/logo.png"
            alt="Logo Gustavo e Ana"
            width={72}
            height={72}
            className="size-12 object-contain"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#28351f]" })}
            href="/#inicio"
          >
            Início
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#28351f]" })}
            href="/#convite"
          >
            Convite
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#28351f]" })}
            href="/#confirmacao"
          >
            Confirmação
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#28351f]" })}
            href="/#vestimenta"
          >
            Vestimenta
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#28351f]" })}
            href="/#presentes"
          >
            Presentes
          </Link>
        </nav>
        <CartSheet items={items} total={total} />
      </div>
    </header>
  );
}
