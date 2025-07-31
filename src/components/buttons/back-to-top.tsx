'use client'

import React, { useEffect, useState } from 'react'
import ArrowUp from 'public/assets/icons/ui/arrow-up.svg'
import { cn } from '#/lib/utilities'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const handleWindowScroll = () => {
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleWindowScroll, { signal: abortController.signal })

    const homePage = document.getElementById('home-page')
    const handleHomeScroll = (e: Event) => {
      setIsVisible((e.target as HTMLElement).scrollTop > 100)
    }
    if (homePage) {
      homePage.addEventListener('scroll', handleHomeScroll, { signal: abortController.signal })
    }

    const userPage = document.getElementById('user-page')
    const handleUserScroll = (e: Event) => {
      setIsVisible((e.target as HTMLElement).scrollTop > 100)
    }
    if (userPage) {
      userPage.addEventListener('scroll', handleUserScroll, { signal: abortController.signal })
    }

    const leaderboardPage = document.getElementById('leaderboard-page')
    const handleLeaderboardScroll = (e: Event) => {
      setIsVisible((e.target as HTMLElement).scrollTop > 100)
    }
    if (leaderboardPage) {
      leaderboardPage.addEventListener('scroll', handleLeaderboardScroll, { signal: abortController.signal })
    }

    return () => abortController.abort()
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const homePage = document.getElementById('home-page')
    const userPage = document.getElementById('user-page')
    const leaderboardPage = document.getElementById('leaderboard-page')

    if (homePage) {
      homePage.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (userPage) {
      userPage.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (leaderboardPage) {
      leaderboardPage.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'fixed right-2 bottom-20 z-50 transition-all transition-discrete sm:right-4 sm:bottom-4',
        isVisible ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0 starting:opacity-100'
      )}
    >
      <button
        onClick={handleBackToTop}
        className='bg-neutral hover:bg-nav-item dark:bg-blue-600 dark:hover:bg-blue-700 shadow-medium flex w-fit items-center gap-2 rounded-sm p-3 text-sm font-semibold transition-all sm:px-5 sm:py-4'
      >
        <p className='hidden sm:block'>Back to top</p>
        <ArrowUp className='h-auto w-5' />
      </button>
    </div>
  )
}

export default BackToTop
