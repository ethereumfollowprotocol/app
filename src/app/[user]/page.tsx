import type { Metadata, ResolvingMetadata } from 'next'
import UserInfo from './components/user-info'

interface Props {
  params: { user: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const user = params.user

  if (!Number.isNaN(Number(user))) return { title: 'User - Ethereum Follow Protocol' }

  // fetch data
  const response = await fetch(`https://api.ensdata.net/${user}`).then(res => res.json())
  const previousImages = (await response).avatar_url

  return {
    title: `${response.ens_primary}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages]
    }
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
