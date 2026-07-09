import { BaseService } from '@/lib/base.service'
import { CartRepositorySupabase } from '@/modules/cart/core/infra/repositories/cart.repository.supabase'
import { CartItemService } from './cart-item.service'
import {
  createCartWithItemsSchema,
  updateCartSchema,
  type Cart,
  type CartRecord,
  type CreateCartInput,
  type UpdateCartInput
} from './cart.schema'

export class CartService extends BaseService<CartRecord, Cart> {
  constructor(private readonly cartItemService: CartItemService = new CartItemService()) {
    super(new CartRepositorySupabase())
  }

  async create(input: CreateCartInput) {
    const parsed = createCartWithItemsSchema.parse(input)
    const total = parsed.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartInput = {
      token: parsed.token,
      status: parsed.status,
      total,
      ...(parsed.guest_id ? { guest_id: parsed.guest_id } : {})
    }
    const cart = await this.repository.create({
      ...cartInput
    })

    await Promise.all(parsed.items.map((item) => this.cartItemService.createForCart(cart.id, item)))

    return this.getOne(cart.id)
  }

  update(id: string, input: UpdateCartInput) {
    return super.update(id, updateCartSchema.parse(input))
  }

  async upsertByToken(token: string, input: Omit<CreateCartInput, 'token'>) {
    const existingCart = await this.getByToken(token)

    if (!existingCart) {
      return this.create({ ...input, token })
    }

    await Promise.all(
      input.items.map(async (item) => {
        const currentItem = await this.cartItemService.getByCartAndGift(
          existingCart.id,
          item.gift_id,
          item.name
        )

        if (!currentItem) {
          return this.cartItemService.createForCart(existingCart.id, item)
        }

        const quantity = currentItem.quantity + item.quantity

        return this.cartItemService.update(currentItem.id, {
          quantity,
          total: quantity * currentItem.price
        })
      })
    )

    const items = await this.getItems(existingCart.id)
    const total = items.reduce((sum, item) => sum + item.total, 0)

    await this.update(existingCart.id, {
      ...(input.guest_id ? { guest_id: input.guest_id } : {}),
      status: input.status,
      total
    })

    return this.getOne(existingCart.id)
  }

  getByToken(token: string) {
    return (this.repository as CartRepositorySupabase).getByToken(token)
  }

  getItems(cartId: string) {
    return this.cartItemService.getByCartId(cartId)
  }

  async removeItem(cartId: string, itemId: string) {
    await this.cartItemService.deleteFromCart(cartId, itemId)

    const items = await this.getItems(cartId)
    const total = items.reduce((sum, item) => sum + item.total, 0)

    await this.update(cartId, { total })

    return this.getOne(cartId)
  }

  async updateItemQuantity(cartId: string, itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(cartId, itemId)
    }

    const items = await this.getItems(cartId)
    const item = items.find((currentItem) => currentItem.id === itemId)

    if (!item) return this.getOne(cartId)

    const maxQuantity = item.gift?.remaining ?? quantity
    const nextQuantity = Math.min(Math.max(quantity, 1), maxQuantity)

    await this.cartItemService.update(item.id, {
      quantity: nextQuantity,
      total: nextQuantity * item.price
    })

    const updatedItems = await this.getItems(cartId)
    const total = updatedItems.reduce((sum, currentItem) => sum + currentItem.total, 0)

    await this.update(cartId, { total })

    return this.getOne(cartId)
  }
}

export const cartService = new CartService()
