import { isAddress } from 'viem'
import type { Metadata } from 'next'

import UserInfo from './components/user-info'

interface Props {
  params: { user: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = params.user

  if (Number.isInteger(Number(user)) && !isAddress(user)) return { title: `List ${user} | EFP` }

  try {
    const response = await fetch(`https://api.ensdata.net/${user}`).then(res => res.json())
    // const newImage = response.avatar_url

    return {
      title: `${response.error ? user : response.ens_primary} | EFP`,
      openGraph: {
        title: `${response.error ? user : response.ens_primary} | EFP`,
        siteName: `${response.error ? user : response.ens_primary} - EFP profile`,
        description: `${response.error ? user : response.ens_primary} - EFP profile`,
        url: `https://testing.ethfollow.xyz/${response.error ? user : response.address}`,
        images: [
          {
            url: `https://testing.ethfollow.xyz/og?user=${user}`
          }
        ]
      },
      twitter: {
        images: `https://testing.ethfollow.xyz/og?user=${user}`
      }
    }
  } catch (err: unknown) {
    return { title: `${user} | EFP` }
  }
}

const UserPage = ({ params }: Props) => {
  return (
    <main className='flex pb-8 min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-[108px] sm:mt-28 md:mt-32 xl:mt-40 px-4 lg:px-8'>
      <UserInfo user={params.user} />
    </main>
  )
}

export default UserPage
