import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import type { ProfileDetailsResponse } from '#/types/requests'

interface DescriptionProps {
  profile: ProfileDetailsResponse
}

const Description: React.FC<DescriptionProps> = ({ profile }) => {
  const { t } = useTranslation()

  return (
    <p className='text-text/80 w-full text-center text-sm font-medium sm:text-sm'>
      {profile.ens.records?.description ? (
        profile.ens.records.description.split(' ').map((word) =>
          word.includes('@') && word.includes('.') ? (
            <Link
              key={word}
              href={`/${word.replace('@', '')}`}
              className='halloween:text-blue-400 halloween:hover:text-blue-300 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
            >
              {word}{' '}
            </Link>
          ) : (
            `${word} `
          )
        )
      ) : (
        <i>{t('no bio')}</i>
      )}
    </p>
  )
}

export default Description
