import { createI18nClient } from 'next-international/client'

export const {
  useI18n,
  defineLocale,
  useScopedI18n,
  useChangeLocale,
  useCurrentLocale,
  I18nProviderClient,
} = createI18nClient({
  en: () => import('./en'),
})
