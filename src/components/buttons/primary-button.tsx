import { cn } from '#/lib/utilities'
import { forwardRef, type MouseEventHandler } from 'react'

interface PrimaryButtonProps {
  className?: string
  label: string
  onClick?: MouseEventHandler
  disabled?: boolean
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, label, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          /* Prioritize the provided bg color, or use default bg color */
          !className?.includes('bg') && 'bg-primary',
          'text-dark-grey relative h-11 w-full rounded-sm text-lg font-bold transition-all hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
          className
        )}
        {...props}
      >
        {label}
      </button>
    )
  }
)

PrimaryButton.displayName = 'PrimaryButton'

export default PrimaryButton
