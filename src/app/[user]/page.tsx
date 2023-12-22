import type { Metadata } from 'next'
import { ogImageURL } from 'src/lib/og'
import { Avatar } from '@radix-ui/themes'
import { getEnsProfile } from '#app/actions.ts'

interface Props {
  params: { user: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user } = params

  return {
    title: `${user} | EFP`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    openGraph: {
      title: `${user} | EFP`,
      images: [ogImageURL({ name: user, followers: 100, following: 10 })]
    }
  }
}

export default async function Page({ params, searchParams }: Props) {
  const profile = await getEnsProfile(params.user)

  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Avatar src={profile['avatar']} fallback='' alt='env ave' size='9' radius='small' />
      <section className='max-w-xl'>
        <pre className='text-left text-black text-clip overflow-clip'>
          {JSON.stringify(profile, undefined, 2)}
        </pre>
      </section>
    </main>
  )
}
