import { z } from '@/lib/zod'

export const rsvpSchema = z.object({
  guestName: z.string().trim().min(2, 'Informe seu nome.'),
  guestEmail: z.email('Informe um email válido.').transform(value => value.toLowerCase()),
  companions: z
    .string()
    .trim()
    .max(500, 'Use ate 500 caracteres.')
    .optional()
    .transform((value) => value || null)
})

export type RsvpInput = z.infer<typeof rsvpSchema>
