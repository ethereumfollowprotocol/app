'use client'

import { ColorSchemes, type ColorSchemeName } from '#/lib/constants/colors.ts'
import { DropdownMenu, IconButton } from '@radix-ui/themes'

export function DevelopmentMenu() {
  const onThemeChange = async (theme: ColorSchemeName) => {
    const body = document.querySelector('body')
    const logo = document.querySelector('img#logo')
    const followButtons = document.querySelectorAll('button[data-button-type="follow"]')
    const unfollowButtons = document.querySelectorAll('button[data-button-type="unfollow"]')

    body?.style.setProperty(
      'background',
      `linear-gradient(180deg, ${ColorSchemes[theme]['secondary']} 0%, ${ColorSchemes[theme]['primary']} 55%, ${ColorSchemes[theme]['tertiary']})`
    )

    logo?.style.setProperty('background-color', ColorSchemes[theme]['primary'])

    for (const button of followButtons) {
      button?.style.setProperty('background', ColorSchemes[theme]['primary'])
    }

    for (const button of unfollowButtons) {
      button?.style.setProperty('background', ColorSchemes[theme]['unfollow'])
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          size={'3'}
          color='pink'
          variant='soft'
          radius='large'
          className='bg-white hover:cursor-pointer hover:opacity-100'
        >
          🛠️
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {Object.entries(ColorSchemes).map(([key]) => (
          <DropdownMenu.Item key={key} onClick={() => onThemeChange(key as ColorSchemeName)}>
            {key}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
