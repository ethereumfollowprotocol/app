export const randomArrayElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)] as T

export const getTimestamp = () => {
  const [timestamp] = new Date().toISOString().split('T')
  return timestamp
}

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined

export const dateStringToHuman = (date: string) => {
  const datifiedDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(datifiedDate)
}
