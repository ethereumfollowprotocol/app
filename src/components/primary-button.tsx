import { Button } from '@radix-ui/themes'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

interface PrimaryButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  className?: string
  label: string
}

export function PrimaryButton({ className, label, onClick, ...props }: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        'bg-gradient-to-b from-kournikova-300 to-salmon-400 text-black',
        props.disabled && 'cursor-not-allowed',
        className
      )}
      radius='full'
      size='3'
      {...props}
    >
      {label}
    </Button>
  )
}
