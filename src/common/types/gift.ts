export type GiftStatus = 'available' | 'reserved' | 'purchased'

export type Gift = {
  id: string
  title: string
  description: string
  priceCents: number
  status: GiftStatus
  imageUrl?: string
}

export type CheckoutItem = Pick<Gift, 'id' | 'title' | 'priceCents'>
