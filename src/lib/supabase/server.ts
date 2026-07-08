import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function createClient() {
  const cookieStore = await cookies()
  const key = supabaseServiceRoleKey ?? supabaseKey

  if (!supabaseUrl || !key) {
    throw new Error('Supabase env vars are not configured.')
  }

  if (supabaseServiceRoleKey) {
    return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  }

  return createServerClient(supabaseUrl, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot set cookies. Proxy refreshes sessions.
        }
      }
    }
  })
}
