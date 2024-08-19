export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatNumberLeaderboard = (num: number) => {
  if (num >= 1e9)
    return `${(num / 1e9).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}B`
  if (num >= 1e6)
    return `${(num / 1e6).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}M`
  if (num >= 1e3)
    return `${(num / 1e3).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}k`
  return num.toString()
}
