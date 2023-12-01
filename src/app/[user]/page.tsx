import Image from 'next/image'
import { getEnsProfile } from 'src/app/actions.ts'

export default async function Page({ params }: { params: { user: string } }) {
  const profile = await getEnsProfile(params.user)
  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Image
        src={profile['avatar']}
        alt='env ave'
        width={200}
        height={200}
        className='rounded-xl'
      />
      <section className='max-w-xl'>
        <pre className='text-left text-black text-clip overflow-clip'>
          {JSON.stringify(profile, undefined, 2)}
        </pre>
      </section>
    </main>
  )
}
