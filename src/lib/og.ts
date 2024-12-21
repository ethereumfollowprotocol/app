import { urlSearchParams } from './utilities'

export function ogImageURL({
  name,
  followers,
  following
}: { name: string; followers: number; following: number }) {
  const searchParams = urlSearchParams({ name, followers, following })
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?${searchParams.toString()}`
}
