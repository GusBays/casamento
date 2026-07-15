"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Gift } from "@/modules/gift/core/domain/gift.schema";
import { GiftCard } from "@/modules/gift/ui/components/gift-card";
import { getPaginateGifts } from "@/modules/gift/ui/gift.action";

type GiftListProps = {
  gifts: Gift[];
  initialPage: number;
  initialHasNextPage: boolean;
  perPage: number;
};

export function GiftList({
  gifts: initialGifts,
  initialPage,
  initialHasNextPage,
  perPage,
}: GiftListProps) {
  const [gifts, setGifts] = useState(initialGifts);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isPending, startTransition] = useTransition();

  function loadMore() {
    startTransition(async () => {
      try {
        const nextPage = page + 1;
        const result = await getPaginateGifts({ page: nextPage, perPage });

        setGifts((currentGifts) => [...currentGifts, ...result.data]);
        setPage(result.pageInfo.page);
        setHasNextPage(result.pageInfo.hasNextPage);
      } catch {
        toast.error("Não foi possível carregar mais presentes. Tente novamente.");
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
        {gifts.map((gift) => (
          <GiftCard gift={gift} key={gift.id} />
        ))}
      </div>

      {hasNextPage ? (
        <div className="flex justify-center">
          <Button
            className="h-12 rounded-full border-[#1e1e1c] px-8 font-serif text-lg"
            disabled={isPending}
            onClick={loadMore}
            type="button"
            variant="outline"
          >
            {isPending ? "Carregando..." : "ver mais"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
