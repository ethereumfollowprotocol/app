export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}
