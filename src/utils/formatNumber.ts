export const formatNumber = (number?: number) => {
  if (!number) return number
  const formattedNumber = number.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

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
