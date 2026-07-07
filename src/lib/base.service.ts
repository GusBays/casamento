import type {
  PaginatedResult,
  PaginationParams,
  SupabaseRepository,
  SupabaseRow
} from '@/lib/supabase/supabase.repository'

export class BaseService<T extends SupabaseRow, TReturn = T> {
  constructor(protected readonly repository: SupabaseRepository<T, TReturn>) {}

  create(input: Omit<Partial<T>, 'id' | 'created_at' | 'updated_at'>) {
    return this.repository.create(input)
  }

  update(id: T['id'], input: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>) {
    return this.repository.update(id, input)
  }

  getOne(id: T['id']) {
    return this.repository.getOne(id)
  }

  getPaginate(params?: PaginationParams): Promise<PaginatedResult<TReturn>> {
    return this.repository.getPaginate(params)
  }

  getAll() {
    return this.repository.getAll()
  }

  delete(id: T['id']) {
    return this.repository.delete(id)
  }
}
