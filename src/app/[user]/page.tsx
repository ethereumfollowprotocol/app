import type { Metadata } from 'next'
import { isAddress, isHex } from 'viem'
import { fetchProfileDetails } from 'ethereum-identity-kit'

import UserInfo from './components/user-info'
import { truncateAddress } from '#/lib/utilities'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

interface Props {
  params: Promise<{ user: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const user = isAddress(params.user) ? params.user : params.user
  const truncatedUser = isAddress(params.user) ? (truncateAddress(params.user) as string) : params.user
  const isList = Number.isInteger(Number(user)) && !(isAddress(user) || isHex(user))
  const displayUser = isList ? `List #${user}` : truncatedUser

  return {
    title: `${displayUser} | EFP`,
    openGraph: {
      title: `${displayUser} | EFP`,
      siteName: `${displayUser} - EFP profile`,
      description: `${displayUser} - EFP profile`,
      url: `https://ethfollow.xyz/${user}`,
      images: [
        {
          url: `https://ethfollow.xyz/og?user=${user}`,
        },
      ],
    },
    twitter: {
      images: `https://ethfollow.xyz/og?user=${user}`,
    },
  }
}

const UserPage = async (props: Props) => {
  const { user } = await props.params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['profile', user, false],
    queryFn: () => (user ? fetchProfileDetails(user as string) : null),
  })

  return (
    <main className='xl:overflow-hidden h-screen w-full'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserInfo user={user} />
      </HydrationBoundary>
    </main>
  )
}

export default UserPage
