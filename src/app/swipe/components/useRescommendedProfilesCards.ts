import { useDrag } from '@use-gesture/react'
import { useSprings } from '@react-spring/web'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord } from '#/utils/list-ops'
import { RECOMMENDED_PROFILES_LIMIT } from '#/lib/constants'
import { useRecommendedProfiles } from '#/contexts/recommended-profiles-context'

const to = () => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 0
})
const from = () => ({ x: 0, rot: 0, scale: 1, y: 0 })

export const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const useRecommendedProfilesCards = () => {
  const { addCartItem, removeCartItem, cartAddresses } = useCart()
  const { gone, recommendedProfiles, isLoading, isFetchingNextPage, fetchNextPage } =
    useRecommendedProfiles()

  const [didSwipeBack, setDidSwipeBack] = useState(false)

  const animatedRef = useRef<HTMLDivElement>(null)
  const addAnimatedElements = () => animatedRef.current?.classList.add('falling-element')
  const handleAnimationEnd = () => animatedRef.current?.classList.remove('falling-element')

  const [props, api] = useSprings(recommendedProfiles.length, i => ({
    ...to(),
    from: from()
  }))

  const canFetchMoreProfiles = useCallback(
    (index: number) =>
      index - recommendedProfiles.length + RECOMMENDED_PROFILES_LIMIT > 0 &&
      (index - recommendedProfiles.length + RECOMMENDED_PROFILES_LIMIT) %
        Math.ceil(RECOMMENDED_PROFILES_LIMIT / 2) ===
        0,
    [fetchNextPage, recommendedProfiles]
  )

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    if (index !== gone.size) return
    const trigger = (mx > 50 && xDir === 1) || (mx < -50 && xDir === -1) // If you flick hard enough it should trigger the card to fly out

    if (!down && trigger) {
      setDidSwipeBack(false)
      gone.add(index)

      if (canFetchMoreProfiles(index)) fetchNextPage()
      if (xDir === 1) {
        setTimeout(() => {
          addCartItem({
            listOp: listOpAddListRecord(
              // @ts-ignore
              recommendedProfiles[index].address
            )
          })
          addAnimatedElements()
        }, 150)
      }
    }

    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (250 + window.innerWidth / 1.5) * xDir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.075 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 80, tension: down ? 800 : isGone ? 250 : 800 }
      }
    })
  })

  const onSwipeLeft = useCallback(() => {
    if (recommendedProfiles.length === 0 || isLoading || gone.size === recommendedProfiles.length)
      return

    const lastCardX = Math.ceil(Math.abs(props[gone.size - 1]?.x.get() || 0))
    if (gone.size > 0 && lastCardX < 250) return

    api.start(i => {
      if (i === gone.size) {
        if (canFetchMoreProfiles(i)) fetchNextPage()

        return {
          x: (250 + window.innerWidth / 1.5) * -1,
          rot: -15,
          scale: 1,
          delay: undefined,
          config: { friction: 80, tension: 250 }
        }
      }
    })
    setDidSwipeBack(false)
    gone.add(gone.size)
  }, [gone, fetchNextPage, api, isLoading, recommendedProfiles])

  const onSwipeRight = useCallback(() => {
    if (recommendedProfiles.length === 0 || isLoading || gone.size === recommendedProfiles.length)
      return

    const lastCardX = Math.ceil(Math.abs(props[gone.size - 1]?.x.get() || 0))
    if (gone.size > 0 && lastCardX < 250) return

    api.start(i => {
      if (i === gone.size) {
        if (canFetchMoreProfiles(i)) fetchNextPage()

        setTimeout(() => {
          addCartItem({
            listOp: listOpAddListRecord(
              // @ts-ignore
              recommendedProfiles[i].address
            )
          })
          addAnimatedElements()
        }, 150)

        return {
          x: (250 + window.innerWidth / 1.5) * 1,
          rot: 15,
          scale: 1,
          delay: undefined,
          config: { friction: 80, tension: 250 }
        }
      }
    })
    setDidSwipeBack(false)
    gone.add(gone.size)
  }, [gone, fetchNextPage, api, isLoading, recommendedProfiles, addAnimatedElements])

  const onSwipeBack = useCallback(() => {
    if (didSwipeBack) return

    gone.delete(gone.size - 1)
    api.start(i => {
      if (i === gone.size) {
        setDidSwipeBack(true)
        setTimeout(() => {
          removeCartItem(
            listOpAddListRecord(
              // @ts-ignore
              recommendedProfiles[i].address
            )
          )
        }, 500)

        return to()
      }
    })
  }, [gone, api, cartAddresses, recommendedProfiles, removeCartItem, didSwipeBack])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onSwipeLeft()
      } else if (event.key === 'ArrowRight') {
        onSwipeRight()
      } else if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowDown') {
        onSwipeBack()
      }
    },
    [onSwipeLeft, onSwipeRight, onSwipeBack]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    api.start(i => {
      if (gone.has(i)) {
        return {
          x: (250 + window.innerWidth / 1.5) * -1,
          rot: -50,
          scale: 1,
          delay: undefined,
          config: { friction: 0, tension: 0 }
        }
      }
    })
  }, [])

  return {
    bind,
    props,
    gone,
    isLoading,
    onSwipeLeft,
    onSwipeBack,
    onSwipeRight,
    didSwipeBack,
    animatedRef,
    handleAnimationEnd,
    isFetchingNextPage,
    recommendedProfiles
  }
}
