'use server'

import { rsvpSchema } from '@/modules/rsvp/core/domain/rsvp.schema'

export type RsvpFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fields?: {
    guestName?: string
    companions?: string
  }
}

export async function confirmRsvp(
  _previousState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const fields = {
    guestName: String(formData.get('guestName') ?? ''),
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

  return {
    status: 'success',
    message: 'Presenca confirmada. Obrigado por avisar a gente!'
  }
}
