import { Badge } from '@/components/ui/badge'

const labels: Record<string, string> = {
  available: 'Disponível',
  reserved: 'Reservado',
  purchased: 'Comprado',
  active: 'Ativo',
  converted: 'Convertido',
  abandoned: 'Abandonado',
  pending: 'Pendente',
  paid: 'Pago',
  expired: 'Expirado',
  cancelled: 'Cancelado',
  failed: 'Falhou',
  refunded: 'Estornado'
}

type StatusBadgeProps = {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant="secondary">{labels[status] ?? status}</Badge>
}
