import type { Metadata } from 'next'
import { isAddress, isHex } from 'viem'

import UserInfo from './components/user-info'
import { truncateAddress } from '#/lib/utilities'

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
  const params = await props.params
  return (
    <main className='xl:overflow-hidden h-screen w-full'>
      <UserInfo user={params.user} />
    </main>
  )
}

export default UserPage
