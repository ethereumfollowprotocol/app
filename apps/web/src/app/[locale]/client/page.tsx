'use client'

import { useI18n, useScopedI18n, useChangeLocale, useCurrentLocale } from '#/locales/client'

export default function Client() {
  const t = useI18n()
  const changeLocale = useChangeLocale({
    // basePath: '/base',
  })
  const t2 = useScopedI18n('about')
  const locale = useCurrentLocale()

  return (
    <main>
      <h1>CSR</h1>
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
    </main>
  )
}
