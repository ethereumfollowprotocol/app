import type { THEMES } from '.'
import MainnetRed from 'public/assets/mainnet-red.svg'
import type { FollowButtonState } from '#/components/follow-button/hooks/use-follow-button'

export const FOLLOW_BUTTON_STYLES: Record<
  FollowButtonState,
  { bg: string; hover?: string; text: string; border: string; imageSrc?: string }
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
    text: 'text-darkGrey',
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

export const FOLLOW_BUTTON_COOL_EMOJI: Record<
  FollowButtonState,
  Record<(typeof THEMES)[number], string | undefined>
> = {
  Follow: {
    light: '/assets/logo.svg',
    dark: '/assets/logo.svg',
  },
  'Pending Following': {
    light: undefined,
    dark: undefined,
  },
  Following: {
    light: '/assets/icons/unfollow-emoji.svg',
    dark: '/assets/icons/unfollow-emoji.svg',
  },
  Unfollow: {
    light: undefined,
    dark: undefined,
  },
  Block: {
    light: '/assets/icons/block-emoji.svg',
    dark: '/assets/icons/block-emoji.svg',
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
    light: '/assets/icons/mute-emoji.svg',
    dark: '/assets/icons/mute-emoji.svg',
  },
  Muted: {
    light: undefined,
    dark: undefined,
  },
  Unmute: {
    light: undefined,
    dark: undefined,
  },
}

export const FOLLOW_BUTTON_SOUND: Record<FollowButtonState, Record<(typeof THEMES)[number], string | undefined>> = {
  Follow: {
    light: '/assets/sound-effects/follow.mp3',
    dark: '/assets/sound-effects/follow.mp3',
  },
  'Pending Following': {
    light: undefined,
    dark: undefined,
  },
  Following: {
    light: '/assets/sound-effects/unfollow.mp3',
    dark: '/assets/sound-effects/unfollow.mp3',
  },
  Unfollow: {
    light: undefined,
    dark: undefined,
  },
  Block: {
    light: undefined,
    dark: undefined,
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
  Mute: {
    light: undefined,
    dark: undefined,
  },
  'Pending Mute': {
    light: undefined,
    dark: undefined,
  },
  Muted: {
    light: undefined,
    dark: undefined,
  },
  Unmute: {
    light: undefined,
    dark: undefined,
  },
}
