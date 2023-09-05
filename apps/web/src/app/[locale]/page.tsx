import { getI18n, getScopedI18n, getCurrentLocale /*, getStaticParams */ } from '#/locales/server'

// Only needed for SSG
// export const generateStaticParams = getStaticParams();

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()

  return (
    <main>
      <h1>SSR / SSG</h1>
      <p>
        Current locale:
        <span>{locale}</span>
      </p>
      <p>Hello: {t('hello')}</p>
      <p>
        Hello:{' '}
        {t('welcome', {
          name: 'John',
        })}
      </p>
      <p>
        Hello (with React components):{' '}
        {t('welcome', {
          name: <strong>John</strong>,
        })}
      </p>
      <p>
        Hello:{' '}
        {t('about.you', {
          age: '23',
          name: 'Doe',
        })}
      </p>
    </main>
  )
}
