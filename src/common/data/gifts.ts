import type { Gift } from '@/common/types/gift'

export const gifts: Gift[] = [
  {
    id: 'jantar-a-dois',
    title: 'Jantar a dois',
    description: 'Uma noite especial para Gustavo e Ana depois da festa.',
    priceCents: 28000,
    status: 'available'
  },
  {
    id: 'cotas-lua-de-mel',
    title: 'Cota da lua de mel',
    description: 'Ajude os noivos a criarem memórias na primeira viagem.',
    priceCents: 35000,
    status: 'available'
  },
  {
    id: 'cafe-da-manha',
    title: 'Cafe da manha',
    description: 'Um comeco calmo para a nova casa.',
    priceCents: 18000,
    status: 'available'
  },
  {
    id: 'utensilios-cozinha',
    title: 'Utensilios de cozinha',
    description: 'Presentes praticos para a rotina de casal.',
    priceCents: 22000,
    status: 'reserved'
  }
]

export function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valueInCents / 100)
}
