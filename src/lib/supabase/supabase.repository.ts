import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export type SupabaseRow = {
  id: string
  created_at?: string
  updated_at?: string
}

export type PaginationParams = {
  page?: number
  perPage?: number
  sort?: 'CREATED_AT'
  reverse?: boolean
  q?: string
}

export type PaginatedResult<T> = {
  data: T[]
  pageInfo: {
    total: number
    page: number
    perPage: number
    lastPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export abstract class SupabaseRepository<T extends SupabaseRow, TReturn = T> {
  protected abstract readonly TABLE: string
  protected readonly SEARCHABLE: string[] = []

  constructor(private readonly supabaseClient?: SupabaseClient) {}

  protected async client() {
    return this.supabaseClient ?? createClient()
  }

  async create(input: Omit<Partial<T>, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .insert(input as never)
      .select()
      .single<TReturn>()

    if (error) throw error

    return data
  }

  async update(id: T['id'], input: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .update(input as never)
      .eq('id', id)
      .select()
      .single<TReturn>()

    if (error) throw error

    return data
  }

  async getOne(id: T['id']) {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select()
      .eq('id', id)
      .single<TReturn>()

    if (error) throw error

    return data
  }

  async getPaginate(params: PaginationParams = {}): Promise<PaginatedResult<TReturn>> {
    const page = Math.max(params.page ?? 1, 1)
    const perPage = Math.max(params.perPage ?? 20, 1)
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    const supabase = await this.client()
    let query = supabase
      .from(this.TABLE)
      .select('*', { count: 'exact' })
      .range(from, to)

    if (params.q) {
      query = this.applySearch(query, params.q)
    }

    if (params.sort === 'CREATED_AT') {
      query = query.order('created_at', { ascending: !params.reverse })
    }

    const { data, error, count } = await query.overrideTypes<TReturn[], { merge: false }>()

    if (error) throw error

    const total = count ?? 0
    const lastPage = Math.max(Math.ceil(total / perPage), 1)

    return {
      data: data ?? [],
      pageInfo: {
        total,
        page,
        perPage,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1
      }
    }
  }

  protected applySearch<TQuery extends { or: (filters: string) => TQuery }>(
    query: TQuery,
    q: string
  ) {
    const search = this.sanitizeSearch(q)

    if (!search || this.SEARCHABLE.length === 0) return query

    return query.or(
      this.SEARCHABLE.map(field => `${this.toDbField(field)}.ilike.%${search}%`).join(',')
    )
  }

  protected toDbField(field: string) {
    return field.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }

  protected sanitizeSearch(q: string) {
    return q.trim().replaceAll(',', ' ')
  }

  async getAll() {
    const supabase = await this.client()
    const { data, error } = await supabase
      .from(this.TABLE)
      .select()
      .overrideTypes<TReturn[], { merge: false }>()

    if (error) throw error

    return data ?? []
  }

  async delete(id: T['id']) {
    const supabase = await this.client()
    const { error } = await supabase.from(this.TABLE).delete().eq('id', id)

    if (error) throw error

    return { id }
  }
}
