import { Avatar } from '@radix-ui/themes'
import { getEnsProfile } from 'src/app/actions.ts'

export default async function Page({ params }: { params: { user: string } }) {
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
