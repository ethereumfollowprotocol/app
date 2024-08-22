import type { Metadata } from 'next'
import UserInfo from './components/user-info'

interface Props {
  params: { user: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const user = params.user

  return {
    title: `${user} | EFP`,
    openGraph: {
      title: `${user} | EFP`,
      siteName: `${user} - EFP profile`,
      description: `${user} - EFP profile`,
      url: `https://testing.ethfollow.xyz/${user}`,
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

  // const isList = Number.isInteger(Number(user)) && !isAddress(user)

  // try {
  //   const response = (await fetch(
  //     `${process.env.NEXT_PUBLIC_EFP_API_URL}/${isList ? 'lists' : 'users'}/${user}/account`
  //   ).then(res => res.json())) as AccountResponseType

  //   const fetchedUser =
  //     isList && response.primary_list !== user
  //       ? `List #${user}`
  //       : response.address
  //         ? response.ens.name || truncateAddress(response.address)
  //         : isAddress(user)
  //           ? truncateAddress(user)
  //           : isList
  //             ? `List #${user}`
  //             : user

  //   return {
  //     title: `${fetchedUser} | EFP`,
  //     openGraph: {
  //       title: `${fetchedUser} | EFP`,
  //       siteName: `${fetchedUser} - EFP profile`,
  //       description: `${fetchedUser} - EFP profile`,
  //       url: `https://testing.ethfollow.xyz/${response.address ? response.address : user}`,
  //       images: [
  //         {
  //           url: `https://testing.ethfollow.xyz/og?user=${user}`
  //         }
  //       ]
  //     },
  //     twitter: {
  //       images: `https://testing.ethfollow.xyz/og?user=${user}`
  //     }
  //   }
  // } catch (err: unknown) {
  //   return { title: `${user} | EFP` }
  // }
}

const UserPage = ({ params }: Props) => {
  return (
    <main className='flex pb-8 min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-[108px] sm:mt-28 md:mt-32 xl:mt-40 px-4 lg:px-8'>
      <UserInfo user={params.user} />
    </main>
  )
}

export default UserPage
