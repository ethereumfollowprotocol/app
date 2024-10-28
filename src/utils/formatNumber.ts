export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatNumberLeaderboard = (number: number) => {
  if (number >= 1e9)
    return `${(number / 1e9).toLocaleString(navigator.language, {
      maximumFractionDigits: 1,
      roundingMode: 'floor'
    })}B`
  if (number >= 1e6)
    return `${(number / 1e6).toLocaleString(navigator.language, {
      maximumFractionDigits: 1,
      roundingMode: 'floor'
    })}M`
  if (number >= 1e3)
    return `${(number / 1e3).toLocaleString(navigator.language, {
      maximumFractionDigits: 1,
      roundingMode: 'floor'
    })}k`

  return number.toString()
}

