import { getI18n, getCurrentLocale } from '#/locales/server'

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO {t('APP_NAME.SHORT')}
      <p>{locale}</p>

    </main>
  )
}
