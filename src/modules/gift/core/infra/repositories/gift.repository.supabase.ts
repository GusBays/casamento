import { SupabaseRepository } from "@/lib/supabase/supabase.repository";
import type { Gift } from "@/modules/gift/core/domain/gift.schema";

export class GiftRepositorySupabase extends SupabaseRepository<Gift> {
  protected readonly TABLE = "gifts";
}
