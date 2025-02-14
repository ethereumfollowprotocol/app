'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useIsClient } from '@uidotdev/usehooks'
import { animated, to as interpolate } from '@react-spring/web'

import SwipeButtons from './swipeButtons'
import Logo from 'public/assets/logo.svg?url'
import UserProfileCard from '#/components/user-profile-card'
import LoadingRecommendedCards from './loading-recommended-cards'
import { trans, useRecommendedProfilesCards } from './useRescommendedProfilesCards'
import ArrowUturnDown from 'public/assets/icons/ui/arrow-uturn-down.svg'

const RecommendedCards = () => {
  const {
    gone,
    cards,
    soundRef,
    isLoading,
    animatedRef,
    onSwipeBack,
    onSwipeLeft,
    onSwipeRight,
    didSwipeBack,
    bindDragToCards,
    isFetchingNextPage,
    recommendedProfiles,
    handleStopAnimationAndSound,
  } = useRecommendedProfilesCards()

  const isClient = useIsClient()
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()

  return (
    <div className='flex w-full flex-col items-center justify-start'>
      {isClient && (
        <audio
          ref={soundRef}
          src={
            resolvedTheme === 'halloween'
              ? '/assets/sound-effects/follow-halloween.mp3'
              : '/assets/sound-effects/follow.mp3'
          }
          key={resolvedTheme}
          preload='auto'
        />
      )}
      <div
        ref={animatedRef}
        className='pointer-events-none fixed top-0 -right-[101vw] z-50 h-screen w-screen delay-150'
        onAnimationEnd={(e) => {
          e.stopPropagation()
          handleStopAnimationAndSound()
        }}
      >
        {new Array(10).fill(1).map((index) => {
          const randomLeft = Math.random() * 80
          const randomTop = 10 + Math.random() * 30

          return (
            <Image
              key={`icons-${index}-${randomLeft}-${randomTop}`}
              src={Logo}
              style={{
                top: `${randomTop}%`,
                left: `${randomLeft}%`,
              }}
              className='repeat-infinite absolute animate-spin'
              alt='follow icon'
              width={32}
              height={32}
            />
          )
        })}
      </div>
      <div className='relative flex h-fit min-h-[500px] w-full flex-col items-center justify-start sm:min-h-[680px]'>
        <LoadingRecommendedCards
          userAddress={userAddress}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          recommendedProfiles={recommendedProfiles}
          gone={gone}
        />
        {!isLoading &&
          cards
            .map(({ x, y, rot, scale }, i) => {
              if (gone.has(i + 3)) return null

              return (
                // @ts-expect-error animated.div is a valid component
                <animated.div
                  className='absolute top-0 z-20 h-fit w-full max-w-92 will-change-transform sm:mr-[14px]'
                  key={`${recommendedProfiles[i]?.address}-${i}`}
                  style={{ x, y }}
                >
                  {/* @ts-expect-error animated.div is a valid component */}
                  <animated.div
                    {...bindDragToCards(i)}
                    style={{
                      transform: interpolate([rot, scale], trans),
                      touchAction: 'none',
                    }}
                  >
                    <div className='cursor-pointer'>
                      <UserProfileCard
                        profile={recommendedProfiles[i]}
                        isResponsive={false}
                        stats={recommendedProfiles[i]?.stats}
                        hideFollowButton={true}
                        isRecommended={true}
                        displayAchievements={false}
                      />
                    </div>
                  </animated.div>
                </animated.div>
              )
            })
            .reverse()}
        <SwipeButtons
          userAddress={userAddress}
          recommendedProfiles={cards}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          gone={gone}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </div>
      <button
        className='bg-text/20 hover:bg-text/40 fixed bottom-4 z-40 flex cursor-pointer flex-row-reverse items-center gap-2 rounded-full px-3 py-2 text-xl transition-all hover:scale-110 disabled:hidden sm:bottom-10 lg:bottom-20'
        onClick={onSwipeBack}
        disabled={didSwipeBack || gone.size === 0}
      >
        <p className='text-lg font-semibold'>{t('undo')}</p> <ArrowUturnDown />
      </button>
    </div>
  )
}

export default RecommendedCards
