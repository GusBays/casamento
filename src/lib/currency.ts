export function roundCurrency(value: number) {
  return Math.round(value * 100) / 100
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
