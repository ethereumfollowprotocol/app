import type { Metadata, ResolvingMetadata } from 'next'
import UserInfo from './components/user-info'
import { isAddress } from 'viem'

interface Props {
  params: { user: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = params.user

  if (Number.isInteger(Number(user)) && !isAddress(user)) return { title: `List ${user} | EFP` }

  try {
    const response = await fetch(`https://api.ensdata.net/${user}`).then(res => res.json())
    // const newImage = response.avatar_url

    return {
      title: `${response.error ? user : response.ens_primary} | EFP`
      // openGraph: {
      //   url: newImage
      // }
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
