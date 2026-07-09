import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function BackHomeLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 font-serif text-base text-[#3f4d2f] hover:text-[#2f3b22]"
      href="/#inicio"
    >
      <ChevronLeft className="size-4" aria-hidden />
      Voltar para o início
    </Link>
  );
}
