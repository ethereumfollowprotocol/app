import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ens_beautify } from '@adraffy/ens-normalize'

import { Avatar } from '#/components/avatar'
import { isValidEnsName } from '#/utils/ens'
import { truncateAddress } from '#/lib/utilities'
import { usePathname } from 'next/navigation'

interface NameProps {
  address: string
  name?: string | null
  avatar?: string | null
  followerTag: {
    text: string
    className: string
  }
}

const Name: React.FC<NameProps> = ({ address, name, avatar, followerTag }) => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <div
      className={`flex gap-2 items-center w-[50%] 3xs:w-[52%] xxs:w-[54%] xs:w-2/3 sm:w-1/2 md:w-[40%] ${
        isHome ? 'w-full md:w-1/2 lg:w-[55%] xl:w-1/2' : 'xl:w-1/3 '
      }`}
      data-name='name-column'
    >
      <Link href={`/${address}`} className='w-fit'>
        <Avatar
          name={name || address}
          avatarUrl={avatar}
          size='h-[45px] w-[45px] 2xl:h-[50px] 2xl:w-[50px] hover:opacity-80 transition-all hover:scale-110 transition-all'
        />
      </Link>
      <div className='flex flex-col items-start justify-center text-left' style={{ maxWidth: 'calc(100% - 65px)' }}>
        <Link href={`/${address}`} className='w-full'>
          <p className='font-bold text-base xxs:text-lg truncate max-w-full hover:opacity-60 hover:scale-110 transition-all'>
            {name && isValidEnsName(name) ? ens_beautify(name) : truncateAddress(address)}
          </p>
        </Link>
        <div
          className={`rounded-full font-bold text-[10px] flex items-center justify-center text-darkGrey bg-zinc-300 h-5 px-2 w-fit ${followerTag.className}`}
        >
          {t(followerTag.text)}
        </div>
      </div>
    </div>
  )
}

export default Name
