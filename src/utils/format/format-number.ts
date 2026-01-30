export const formatNumber = (number: number) => {
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  const formattedNumber = new Intl.NumberFormat(locale).format(number)

  return formattedNumber
}

export const formatNumberLeaderboard = (number: number) => {
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
  })

  const floorLastDigit = (num: number) => Math.floor(num * 10) / 10
  if (number >= 1e9) return `${formatter.format(floorLastDigit(number / 1e9))}B`
  if (number >= 1e6) return `${formatter.format(floorLastDigit(number / 1e6))}M`
  if (number >= 1e3) return `${formatter.format(floorLastDigit(number / 1e3))}k`

  return number.toString()
}
