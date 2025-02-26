'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'
import { animated, to as interpolate } from '@react-spring/web'

import SwipeButtons from './swipe-buttons'
import Logo from 'public/assets/logo.svg?url'
import UserProfileCard from '#/components/user-profile-card'
import LoadingRecommendedCards from './loading-recommended-cards'
import { trans, useRecommendedProfilesCards } from './useRescommendedProfilesCards'
import KeyboardArrowRight from 'public/assets/icons/ui/keyboard-arrow-right.svg'
import KeyboardArrowLeft from 'public/assets/icons/ui/keyboard-arrow-left.svg'
import KeyboardArrowDown from 'public/assets/icons/ui/keyboard-arrow-down.svg'
import MouseRight from 'public/assets/icons/ui/mouse-right.svg'
import MouseLeft from 'public/assets/icons/ui/mouse-left.svg'

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
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()

  return (
    <div className='flex h-screen w-full flex-col justify-center gap-10 sm:h-auto lg:flex-row lg:items-center lg:justify-center xl:h-screen'>
      <div className='hidden flex-col items-start gap-6 sm:flex lg:w-72 xl:absolute xl:left-28'>
        <h1 className='w-full text-start text-6xl font-bold'>Swipe!</h1>
        <p className='w-full text-start'>
          Find new friends onchain. <br /> Swipe right to Follow, swipe left to NOPE.
        </p>
        <div className='text-text-neutral flex gap-12 lg:flex-col'>
          <div className='flex flex-col items-start gap-3'>
            <p className='text-text text-lg font-medium'>Keyboard</p>
            <div className='flex flex-row gap-2'>
              <KeyboardArrowRight className='h-10 w-10' />
              <div className='-mt-px flex flex-col items-start'>
                <p className='text-sm'>Right Arrow</p>
                <p>Swipe Right (Follow)</p>
              </div>
            </div>
            <div className='flex flex-row gap-2'>
              <KeyboardArrowLeft className='h-10 w-10' />
              <div className='-mt-px flex flex-col items-start'>
                <p className='text-sm'>Left Arrow</p>
                <p>Swipe Left (NOPE)</p>
              </div>
            </div>
            <div className='flex flex-row gap-2'>
              <KeyboardArrowDown className='h-10 w-10' />
              <div className='-mt-px flex flex-col items-start'>
                <p className='text-sm'>Arrow Down</p>
                <p>Undo</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start gap-3'>
            <p className='text-text text-lg font-medium'>Mouse</p>
            <div className='flex flex-row items-center gap-2'>
              <MouseRight className='h-9 w-auto' />
              <p>Grab and Swipe Right (Follow)</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <MouseLeft className='h-9 w-auto' />
              <p>Grab and Swipe Left (NOPE)</p>
            </div>
          </div>
        </div>
      </div>
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
        {isClient &&
          new Array(10).fill(1).map((index) => {
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
      <div className='justify-start] relative flex h-fit min-h-[500px] w-full flex-col items-center'>
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
                    <div className='shadow-medium w-fit cursor-pointer rounded-sm p-0'>
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
          onSwipeBack={onSwipeBack}
          didSwipeBack={didSwipeBack}
        />
      </div>
    </div>
  )
}

export default RecommendedCards
