'use server'

import type { PaginationParams } from '@/lib/supabase/supabase.repository'
import type { CreateOrderInput, UpdateOrderInput } from '@/modules/order/core/domain/order.schema'
import { orderService, type OrderService } from '@/modules/order/core/domain/order.service'

function service(): OrderService {
  return orderService
}

export function createOrder(input: CreateOrderInput) {
  return service().create(input)
}

export function updateOrder(id: string, input: UpdateOrderInput) {
  return service().update(id, input)
}

export function getOneOrder(id: string) {
  return service().getOne(id)
}

export function getAllOrders() {
  return service().getAll()
}

export function getPaginateOrders(params?: PaginationParams) {
  return service().getPaginate(params)
}

export function deleteOrder(id: string) {
  return service().delete(id)
}
