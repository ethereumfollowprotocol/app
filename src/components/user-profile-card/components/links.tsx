import React from 'react'
import type { ProfileDetailsResponse } from '#/types/requests'
import DwebIcon from 'public/assets/icons/socials/dweb.svg'
import Link from 'public/assets/icons/ui/link.svg'
interface LinksProps {
  profile: ProfileDetailsResponse
}

const Links: React.FC<LinksProps> = ({ profile }) => {
  if (!profile.ens.records?.url && !(profile.ens.contenthash || profile.ens.records?.contenthash)) return null

  return (
    <div className='flex w-3/4 items-center justify-start gap-2'>
      {profile.ens.records?.url && (
        <a
          href={`https://${profile.ens.records.url.replace('https://', '').replace('http://', '')}`}
          target='_blank'
          rel='noreferrer'
          className='bg-nav-item mb-1 flex max-w-1/2 items-center gap-1 rounded-sm px-2 py-0.5 text-sm text-blue-600 transition-all hover:scale-110 dark:text-blue-400'
        >
          <p className='halloween:text-blue-400 max-w-[90%] truncate font-semibold'>
            {profile.ens.records?.url.slice(-1) === '/'
              ? profile.ens.records?.url.replace('https://', '').slice(0, -1)
              : profile.ens.records?.url.replace('https://', '')}
          </p>
          <Link className='h-auto w-4' />
        </a>
      )}
      {(profile.ens.contenthash || profile.ens.records?.contenthash) && (
        <a
          href={`https://${profile.ens.name}.limo`}
          target='_blank'
          rel='noreferrer'
          className='bg-nav-item mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 pr-0.5 text-sm transition-all hover:scale-110'
        >
          <p className='halloween:text-blue-400 font-semibold'>dweb</p>
          <DwebIcon className='rounded-full' />
        </a>
      )}
    </div>
  )
}

export default Links
