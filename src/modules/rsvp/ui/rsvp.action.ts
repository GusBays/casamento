'use server'

import { rsvpSchema } from '@/modules/rsvp/core/domain/rsvp.schema'
import { createClient } from '@/lib/supabase/server'
import { upsertGuestByEmail } from '@/modules/guest/ui/guest.action'

export type RsvpFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fields?: {
    guestName?: string
    guestEmail?: string
    companions?: string
  }
}

export async function confirmRsvp(
  _previousState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const fields = {
    guestName: String(formData.get('guestName') ?? ''),
    guestEmail: String(formData.get('guestEmail') ?? ''),
    companions: String(formData.get('companions') ?? '')
  }

  const result = rsvpSchema.safeParse(fields)

  if (!result.success) {
    return {
      status: 'error',
      message: result.error.issues[0]?.message ?? 'Revise os dados e tente novamente.',
      fields
    }
  }

  const guest = await upsertGuestByEmail({
    name: result.data.guestName,
    email: result.data.guestEmail,
    phone: null
  })
  const supabase = await createClient()
  const { error } = await supabase.from('rsvps').upsert(
    {
      guest_id: guest.id,
      companions: result.data.companions,
      updated_at: new Date().toISOString()
    },
    {
      onConflict: 'guest_id'
    }
  )

  if (error) {
    return {
      status: 'error',
      message: 'Não foi possível registrar sua confirmação. Tente novamente.',
      fields
    }
  }

  return {
    status: 'success',
    message: 'Presenca confirmada. Obrigado por avisar a gente!'
  }
}
