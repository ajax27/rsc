export default function formatCurrency(num) {
  return `£${+num.toFixed(2).toLocaleString() + ' '}`
}
