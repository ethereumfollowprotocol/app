import type { Metadata } from 'next'
import { isAddress, isHex } from 'viem'
import { fetchProfileDetails, fetchProfileStats } from '@encrypteddegen/identity-kit/utils'

import { MINUTE } from '#/lib/constants'
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
      url: `https://efp.app/${user}`,
      images: [
        {
          url: `https://efp.app/og?user=${user}`,
        },
      ],
    },
    twitter: {
      images: `https://efp.app/og?user=${user}`,
    },
  }
}

const UserPage = async (props: Props) => {
  const { user } = await props.params
  const isList = Number.isInteger(Number(user)) && !(isAddress(user) || isHex(user))
  const listNum = isList ? Number(user) : undefined

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['profile', user, false],
    queryFn: () => (user ? fetchProfileDetails(user as string, listNum) : null),
    staleTime: 3 * MINUTE,
  })

  await queryClient.prefetchQuery({
    queryKey: ['stats', user, false],
    queryFn: () => (user ? fetchProfileStats(user as string, listNum) : null),
    staleTime: 3 * MINUTE,
  })

  return (
    <main className='h-screen w-full xl:overflow-hidden'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserInfo user={user} />
      </HydrationBoundary>
    </main>
  )
}

export default UserPage
