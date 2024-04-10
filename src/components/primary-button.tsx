import { Button } from '@radix-ui/themes'
import clsx from 'clsx'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

interface PrimaryButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  className?: string
  label: string
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, label, onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={clsx(
          /* Prioritize the provided bg color, or use default bg color */
          !className?.includes('bg') && 'bg-gradient-to-b from-kournikova-300 to-salmon-400',
          'text-black',
          props.disabled && 'cursor-not-allowed opacity-70',
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
)
