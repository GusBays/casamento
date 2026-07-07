import { z } from 'zod'

export const rsvpSchema = z.object({
  guestName: z.string().trim().min(2, 'Informe seu nome.'),
  companions: z
    .string()
    .trim()
    .max(500, 'Use ate 500 caracteres.')
    .optional()
    .transform((value) => value || null)
})

export type RsvpInput = z.infer<typeof rsvpSchema>
