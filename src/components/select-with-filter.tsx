'use client'

import clsx from 'clsx'
import * as React from 'react'
import { SECOND } from '#lib/constants/index.ts'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'next-usequerystate'
import { Box, Button, Select } from '@radix-ui/themes'
import { useEffectOnce } from '#hooks/use-effect-once.ts'

export function SelectWithFilter({
  disabled,
  dropdownOnly = true,
  queryKey,
  items,
  defaultValue
}: {
  dropdownOnly?: boolean
  disabled?: boolean
  queryKey: string
  items: Array<string>
  defaultValue?: string
}) {
  const [, startTransition] = React.useTransition()
  const [filter, setFilter] = useQueryState(queryKey, {
    throttleMs: SECOND / 2
  })

  const filterParam = useSearchParams()

  // On first visit: check url search param and set filter state
  useEffectOnce(() => {
    startTransition(() => {
      setFilter(filterParam.get(queryKey))
    })
  })

  function handleChange(newFilter: string | null) {
    startTransition(() => {
      if (newFilter === filter) setFilter(null)
      else if (filter) setFilter(newFilter)
      else setFilter(newFilter)
    })
  }

  function handleChangeEvent(event?: React.MouseEvent<HTMLButtonElement>) {
    const newFilter = event?.currentTarget.name ?? null
    handleChange(newFilter)
  }

  return (
    <Box className='space-x-3 lg:ml-0 mr-auto' px='0' my='auto'>
      <div className={clsx(['block capitalize', dropdownOnly ? 'block' : 'block lg:hidden mr-2'])}>
        <Select.Root
          defaultValue={defaultValue}
          value={filter?.toLowerCase()}
          onValueChange={handleChange}
        >
          <Select.Trigger
            variant='soft'
            className='rounded-lg bg-white/70 p-4 font-semibold !border-none text-sm ml-2'
          />
          <Select.Content>
            <Select.Group>
              {items.map((item, index) => (
                <Select.Item value={item.toLowerCase()} className='capitalize' key={`${index}`}>
                  {item}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      {dropdownOnly ? null : (
        <div className='hidden lg:block space-x-3'>
          {items.map((item, index) => (
            <Button
              key={`${index}`}
              size='2'
              radius='full'
              className={clsx([
                'text-sm px-4 font-semibold text-black capitalize',
                filter === item.toLowerCase() ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
              ])}
              disabled={disabled}
              name={item.toLowerCase()}
              onClick={handleChangeEvent}
            >
              {item}
            </Button>
          ))}
        </div>
      )}
    </Box>
  )
}
