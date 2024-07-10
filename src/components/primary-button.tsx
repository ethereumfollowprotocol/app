import clsx from 'clsx'
import { forwardRef, type MouseEventHandler } from 'react'

interface PrimaryButtonProps {
  className?: string
  label: string
  onClick: MouseEventHandler
  disabled?: boolean
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, label, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={clsx(
          /* Prioritize the provided bg color, or use default bg color */
          !className?.includes('bg') && 'bg-gradient-to-b from-kournikova-300 to-salmon-400',
          'text-darkGrey rounded-full font-semibold hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60',
          className
        )}
        {...props}
      >
        {label}
      </button>
    )
  }
)
