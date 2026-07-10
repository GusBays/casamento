import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import type { User } from '@/modules/user/core/domain/user.schema'

export const USER_AUTH_COOKIE_NAME = 'admin_token'

export async function getUserByToken(token: string | undefined) {
  if (!token) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('token', token)
    .maybeSingle<User>()

  if (error) throw error

  return data
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(USER_AUTH_COOKIE_NAME)?.value

  return getUserByToken(token)
}

export async function requireUser() {
  const user = await getCurrentUser()

  if (!user) redirect('/admin/login')

  return user
}

export async function findUserByCredentials(username: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .eq('password', password)
    .maybeSingle<User>()

  if (error) throw error

  return data
}

export async function setUserToken(userId: string, token: string | null) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .update({ token })
    .eq('id', userId)
    .select()
    .single<User>()

  if (error) throw error

  return data
}
