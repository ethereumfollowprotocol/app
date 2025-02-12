import Image from 'next/image'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useEffect, useCallback, useRef } from 'react'
import List from 'react-virtualized/dist/commonjs/List'

import EFPLogo from 'public/assets/logo.svg'
import type { ENSProfile } from '#/types/requests'
import type { ProfileStatsType } from '#/types/common'
import SocialProfilesItem, {
  type SocialProfileListProfile,
} from '#/components/profile-list/components/social-profiles-item'
import LoadingRow from '#/components/profile-list/components/list-item/loading-list-item'
import ProfileListItem from '#/components/profile-list/components/list-item/profile-list-item'
import ProfileList from '#/components/profile-list'

export interface ProfileListProfile {
  address: Address
  ens?: ENSProfile
  tags: string[]
  counts?: ProfileStatsType
}

interface CartItemsListProps {
  listClassName?: string
  profiles?: ProfileListProfile[]
  socialProfiles?: SocialProfileListProfile[]
  showTags?: boolean
  createListItem?: boolean
  loadingRows?: number
  isLoading: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  listClassName = '',
  profiles,
  socialProfiles,
  showTags,
  createListItem,
  loadingRows = 7,
  isLoading,
  containerRef,
}) => {
  const { t } = useTranslation()

  const isCreatingNewList =
    createListItem &&
    ((profiles && profiles?.length > 0) || socialProfiles?.map((profile) => profile.profiles.length > 0).includes(true))

  const listRef = useRef<List>(null)

  let scrollTop = 0
  const handleWheel = useCallback((event: WheelEvent) => {
    if (listRef.current) {
      // Adjust the scroll position of the div
      const maxScrollTop =
        listRef.current.props.rowCount * Number(listRef.current.props.rowHeight) - listRef.current.props.height

      if (scrollTop < maxScrollTop || event.deltaY < 0) {
        listRef.current.scrollToPosition(scrollTop + event.deltaY)
        if (scrollTop + event.deltaY >= -20) scrollTop += event.deltaY
      }
    }
  }, [])

  useEffect(() => {
    // Attach the wheel event listener to the window
    containerRef.current?.addEventListener('wheel', handleWheel, { passive: false })

    // Cleanup function to remove the event listener
    return () => {
      containerRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div className={`flex w-full flex-col ${listClassName}`}>
      {isLoading ? (
        new Array(loadingRows).fill(1).map((_, i) => <LoadingRow key={i} showTags={showTags} />)
      ) : (
        <>
          {isCreatingNewList && (
            <div
              key={'new list'}
              className='hover:bg-list ounded-xl flex w-[350px] items-center gap-2 p-1.5 sm:w-full sm:gap-3 sm:p-2 2xl:p-4'
            >
              <Image src={EFPLogo} alt='EFP List' className='h-[45px] w-[45px] rounded-full md:h-[50px] md:w-[50px]' />
              <div className='flex flex-col md:flex-row md:items-center'>
                <p className='w-fit text-left text-lg font-bold sm:w-56'>{t('mint name')}</p>
                <p className='text-text/80 text-left text-sm font-bold italic sm:text-base'>{t('mint description')}</p>
              </div>
            </div>
          )}
          {socialProfiles?.map((social) => <SocialProfilesItem key={social.platform} {...social} />)}
          {(profiles?.length || 0) >= 30 ? (
            // @ts-expect-error react-virtualized List is a valid component
            <List
              ref={listRef}
              autoWidth={true}
              key={'list'}
              height={window.innerHeight - 186}
              width={window.innerWidth}
              overscanRowCount={10}
              rowCount={(profiles?.length || 0) + 2}
              rowHeight={window.innerWidth > 1536 ? 82 : 88}
              rowRenderer={({ key, index, style }) => {
                const profile = profiles?.[index]
                if (!profile)
                  return (
                    <div style={style} key={key} className='opacity-0'>
                      <LoadingRow showTags={showTags} />
                    </div>
                  )

                return (
                  <div className='w-full' key={key} style={style}>
                    <ProfileListItem
                      key={profile.address}
                      address={profile.address}
                      ensProfile={profile.ens}
                      tags={profile.tags}
                      counts={profile.counts}
                      showTags={true}
                      canEditTags={true}
                    />
                  </div>
                )
              }}
            />
          ) : (
            <ProfileList
              showTags={true}
              canEditTags={true}
              profiles={profiles}
              isLoading={isLoading}
              className='gap-4 pb-4 2xl:gap-5'
            />
          )}
        </>
      )}
    </div>
  )
}

export default CartItemsList
