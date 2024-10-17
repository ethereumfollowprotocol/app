import { useDrag } from '@use-gesture/react'
import { useCallback, useEffect } from 'react'
import { useSprings } from '@react-spring/web'

import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord } from '#/utils/list-ops'
import { RECOMMENDED_PROFILES_LIMIT } from '#/lib/constants'
import { useRecommendedProfiles } from '#/contexts/recommended-profiles-context'

const to = (i: number) => ({
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
  // const [isAnimatingFollow, setIsAnimatingFollow] = useState(false)

  // const animateFollow = () => {
  //   if (isAnimatingFollow) return

  //   setIsAnimatingFollow(true)
  //   setTimeout(() => {
  //     setIsAnimatingFollow(false)
  //   }, 1300)
  // }

  const { addCartItem, removeCartItem, cartAddresses } = useCart()
  const { gone, recommendedProfiles, isLoading, isFetchingNextPage, fetchNextPage } =
    useRecommendedProfiles()

  const [props, api] = useSprings(recommendedProfiles.length, i => ({
    ...to(i),
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
    const trigger = velocity[0] > 0.15 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // -1 for left, 1 for right

    if (!down && trigger) {
      gone.add(index)

      if (canFetchMoreProfiles(index)) fetchNextPage()

      if (dir === 1) {
        // animateFollow()
        if (recommendedProfiles[recommendedProfiles.length - 1 - index]?.address) {
          setTimeout(() => {
            const addToCart = () => {
              addCartItem({
                listOp: listOpAddListRecord(
                  // @ts-ignore
                  recommendedProfiles[recommendedProfiles.length - 1 - index].address
                )
              })
            }

            if (window.requestIdleCallback) {
              window.requestIdleCallback(addToCart)
            } else {
              setTimeout(addToCart, 300) // Adjust delay as needed
            }
          }, 300)
        }
      }
    }

    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 8 * velocity[0] : 0) // How much the card tilts, flicking it harder makes it rotate faster
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

    api.start(i => {
      if (i === gone.size) {
        if (canFetchMoreProfiles(i)) fetchNextPage()

        const x = (200 + window.innerWidth) * -1
        const rot = -50
        const scale = 1
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: 200 }
        }
      }
    })
    gone.add(gone.size)
  }, [gone, fetchNextPage, api, isLoading, recommendedProfiles])

  const onSwipeRight = useCallback(() => {
    if (recommendedProfiles.length === 0 || isLoading || gone.size === recommendedProfiles.length)
      return

    api.start(i => {
      if (i === gone.size) {
        if (canFetchMoreProfiles(i)) fetchNextPage()

        if (recommendedProfiles[recommendedProfiles.length - 1 - i]?.address) {
          // animateFollow()
          setTimeout(() => {
            const addToCart = () => {
              addCartItem({
                listOp: listOpAddListRecord(
                  // @ts-ignore
                  recommendedProfiles[recommendedProfiles.length - 1 - i].address
                )
              })
            }

            if (window.requestIdleCallback) {
              window.requestIdleCallback(addToCart)
            } else {
              setTimeout(addToCart, 300) // Adjust delay as needed
            }
          }, 300)
        }

        const x = (200 + window.innerWidth) * 1
        const rot = 50
        const scale = 1
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: 200 }
        }
      }
    })
    gone.add(gone.size)
  }, [gone, fetchNextPage, api, isLoading, recommendedProfiles])

  const onSwipeBack = useCallback(() => {
    gone.delete(gone.size - 1)
    api.start(i => {
      if (i === gone.size) {
        if (
          cartAddresses.includes(
            recommendedProfiles[recommendedProfiles.length - i - 1]?.address || ''
          )
        ) {
          setTimeout(() => {
            const removeFromCart = () => {
              removeCartItem(
                listOpAddListRecord(
                  // @ts-ignore
                  recommendedProfiles[recommendedProfiles.length - i - 1].address
                )
              )
            }
            if (window.requestIdleCallback) {
              window.requestIdleCallback(removeFromCart)
            } else {
              setTimeout(removeFromCart, 500) // Adjust delay as needed
            }
          }, 500)
        }
        return to(i)
      }
    })
  }, [gone, api, cartAddresses, recommendedProfiles, removeCartItem])

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
          x: (200 + window.innerWidth) * -1,
          rot: -50,
          scale: 1,
          delay: undefined,
          config: { friction: 30, tension: 800 }
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
    isFetchingNextPage,
    recommendedProfiles
  }
}
