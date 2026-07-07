import { BaseService } from '@/lib/base.service'
import { CartItemRepositorySupabase } from '@/modules/cart/core/infra/repositories/cart-item.repository.supabase'
import {
  createCartItemSchema,
  type CartItem,
  type CreateCartItemInput
} from './cart.schema'

export class CartItemService extends BaseService<CartItem> {
  constructor() {
    super(new CartItemRepositorySupabase())
  }

  createForCart(cartId: string, input: CreateCartItemInput) {
    const parsed = createCartItemSchema.parse(input)
    const total = parsed.price * parsed.quantity

    return super.create({ ...parsed, cart_id: cartId, total })
  }

  getByCartId(cartId: string) {
    return (this.repository as CartItemRepositorySupabase).getByCartId(cartId)
  }

  getByCartAndGift(cartId: string, giftId: string | null, name?: string) {
    return (this.repository as CartItemRepositorySupabase).getByCartAndGift(cartId, giftId, name)
  }
}
