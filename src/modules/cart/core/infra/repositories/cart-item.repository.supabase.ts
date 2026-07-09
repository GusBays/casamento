import { SupabaseRepository } from '@/lib/supabase/supabase.repository'
import type { CartItem } from '@/modules/cart/core/domain/cart.schema'

export class CartItemRepositorySupabase extends SupabaseRepository<CartItem> {
  protected readonly TABLE = 'cart_items'

  async getByCartId(cartId: string) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select('*, gift:gifts(remaining, quotes, status)')
      .eq('cart_id', cartId)
      .overrideTypes<CartItem[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }

  async getByCartAndGift(cartId: string, giftId: string | null, name?: string) {
    const supabase = await this.client()
    let query = supabase
      .from(this.TABLE)
      .select('*, gift:gifts(remaining, quotes, status)')
      .eq('cart_id', cartId)

    query = giftId ? query.eq('gift_id', giftId) : query.is('gift_id', null).eq('name', name ?? '')

    const { data, error } = await query.maybeSingle<CartItem>()

    if (error) throw error

    return data
  }

  async deleteFromCart(cartId: string, itemId: string) {
    const supabase = await this.client()
    const { error } = await supabase
      .from(this.TABLE)
      .delete()
      .eq('cart_id', cartId)
      .eq('id', itemId)

    if (error) throw error

    return { id: itemId }
  }
}
