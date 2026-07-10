'use server'

import { randomUUID } from 'node:crypto'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  findUserByCredentials,
  requireUser,
  setUserToken,
  USER_AUTH_COOKIE_NAME
} from '@/modules/user/core/domain/user.service'
import { loginFormSchema } from '@/modules/user/core/domain/user.schema'

export async function loginUser(input: unknown) {
  const { username, password } = loginFormSchema.parse(input)
  const user = await findUserByCredentials(username, password).catch(() => null)

  if (!user) redirect('/admin/login?error=1')

  const token = randomUUID()
  await setUserToken(user.id, token)

  const cookieStore = await cookies()
  cookieStore.set(USER_AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 7
  })

  redirect('/admin/presents')
}

export async function logoutUser() {
  const user = await requireUser()
  await setUserToken(user.id, null)

  const cookieStore = await cookies()
  cookieStore.delete(USER_AUTH_COOKIE_NAME)

  redirect('/admin/login')
}
