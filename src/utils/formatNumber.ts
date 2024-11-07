export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatNumberLeaderboard = (number: number) => {
  const formatter = new Intl.NumberFormat(navigator.language ?? 'en-US', {
    maximumFractionDigits: 1
  })

  const floorLastDigit = (num: number) => Math.floor(num * 10) / 10
  if (number >= 1e9) return `${formatter.format(floorLastDigit(number / 1e9))}B`
  if (number >= 1e6) return `${formatter.format(floorLastDigit(number / 1e6))}M`
  if (number >= 1e3) return `${formatter.format(floorLastDigit(number / 1e3))}k`

  return number.toString()
}
