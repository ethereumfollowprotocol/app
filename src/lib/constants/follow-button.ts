import type { THEMES } from '.'
import MainnetRed from 'public/assets/mainnet-red.svg'
import type { SVGProps } from 'react'
import type { FollowingState } from '@encrypteddegen/identity-kit'

export const FOLLOW_BUTTON_STYLES: Record<
  FollowingState,
  { bg: string; hover?: string; text: string; border: string; imageSrc?: React.ComponentType<SVGProps<SVGSVGElement>> }
> = {
  Follow: {
    bg: 'btn-grad',
    text: 'text-zinc-800',
    border: 'border-0',
  },
  'Pending Following': {
    bg: 'btn-following-pending',
    hover:
      'hover:bg-none hover:bg-[#D0D0D0] hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform',
    text: 'text-gray-900',
    border:
      'border-[3px] after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400',
  },
  Following: {
    bg: 'btn-following',
    hover:
      'hover:bg-none hover:bg-deletion hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform',
    text: 'text-gray-900',
    border: 'border-[3px]',
  },
  Unfollow: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-gray-900',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400',
  },
  // Subscribe: {
  //   bg: "btn-grad",
  //   text: "text-zinc-800",
  //   border: "border-0 ",
  // },
  // Subscribed: {
  //   bg: "bg-addition",
  //   text: "text-zinc-800",
  //   border: "border-[3px] border-zinc-200",
  // },
  // Unsubscribe: {
  //   bg: "bg-deletion",
  //   text: "text-gray-900",
  //   border:
  //     "border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400",
  // },
  Block: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border: 'border-0',
  },
  'Block Back': {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border: 'border-0',
  },
  'Pending Block': {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border:
      'border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400',
    imageSrc: MainnetRed,
  },
  Blocked: {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border: 'border-[3px] border-red-500',
    imageSrc: MainnetRed,
  },
  Unblock: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400',
  },
  Mute: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-dark-grey',
    border: 'border-0',
  },
  'Mute Back': {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border: 'border-0',
  },
  'Pending Mute': {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border:
      'border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400',
    imageSrc: MainnetRed,
  },
  Muted: {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border: 'border-[3px] border-red-500',
    imageSrc: MainnetRed,
  },
  Unmute: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400',
  },
}

export const FOLLOW_BUTTON_COOL_EMOJI: Record<FollowingState, Record<(typeof THEMES)[number], string | undefined>> = {
  Follow: {
    light: '/assets/logo.svg',
    dark: '/assets/logo.svg',
  },
  'Pending Following': {
    light: undefined,
    dark: undefined,
  },
  Following: {
    light: '/assets/icons/emojis/unfollow-emoji.svg',
    dark: '/assets/icons/emojis/unfollow-emoji.svg',
  },
  Unfollow: {
    light: undefined,
    dark: undefined,
  },
  Block: {
    light: '/assets/icons/emojis/block-emoji.svg',
    dark: '/assets/icons/emojis/block-emoji.svg',
  },
  'Pending Block': {
    light: undefined,
    dark: undefined,
  },
  Blocked: {
    light: undefined,
    dark: undefined,
  },
  Unblock: {
    light: undefined,
    dark: undefined,
  },
  'Pending Mute': {
    light: undefined,
    dark: undefined,
  },
  Mute: {
    light: '/assets/icons/emojis/mute-emoji.svg',
    dark: '/assets/icons/emojis/mute-emoji.svg',
  },
  Muted: {
    light: undefined,
    dark: undefined,
  },
  Unmute: {
    light: undefined,
    dark: undefined,
  },
  'Mute Back': {
    light: '/assets/icons/emojis/mute-emoji.svg',
    dark: '/assets/icons/emojis/mute-emoji.svg',
  },
  'Block Back': {
    light: '/assets/icons/emojis/block-emoji.svg',
    dark: '/assets/icons/emojis/block-emoji.svg',
  },
}

export const FOLLOW_BUTTON_SOUND: Record<FollowingState, string | undefined> = {
  Follow: '/assets/sound-effects/follow.mp3',
  'Pending Following': undefined,
  Following: '/assets/sound-effects/unfollow.mp3',
  Unfollow: undefined,
  Block: undefined,
  'Pending Block': undefined,
  Blocked: undefined,
  Unblock: undefined,
  Mute: undefined,
  'Pending Mute': undefined,
  Muted: undefined,
  Unmute: undefined,
  'Mute Back': undefined,
  'Block Back': undefined,
}
