import { cn } from '#/lib/utilities'
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
        className={cn(
          /* Prioritize the provided bg color, or use default bg color */
          !className?.includes('bg') && 'bg-gradient-to-b from-[#FFDE60] to-[#FFA997]',
          'text-darkGrey relative rounded-full text-lg font-bold transition-all hover:scale-110 disabled:hover:scale-100 hover:opacity-85 disabled:cursor-not-allowed disabled:after:absolute disabled:after:w-full disabled:after:h-full disabled:after:top-0 disabled:after:left-0 disabled:after:bg-zinc-400/50 disabled:after:rounded-full disabled:hover:opacity-100',
          className
        )}
        {...props}
      >
        {label}
      </button>
    )
  }
)
