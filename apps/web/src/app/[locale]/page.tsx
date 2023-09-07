import { getI18n, getCurrentLocale } from '#/locales/server'
import { FollowButton } from '#/components/FollowButton'

export default async function Home() {
  const t = await getI18n()

  const locale = getCurrentLocale()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>

    </main>
  )
}
