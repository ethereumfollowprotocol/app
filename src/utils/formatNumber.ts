export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatNumberLeaderboard = (num: number) => {
  const number = Math.floor(num * 10) / 10
  if (number >= 1e9)
    return `${(number / 1e9).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}B`
  if (number >= 1e6)
    return `${(number / 1e6).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}M`
  if (number >= 1e3)
    return `${(number / 1e3).toLocaleString(navigator.language, {
      maximumFractionDigits: 1
    })}k`
  return num.toString()
}
