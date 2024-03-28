import { Button } from '@radix-ui/themes'
import clsx from 'clsx'

interface PrimaryButtonProps {
  className?: string
  label: string
  onClick?: () => void
}

export function PrimaryButton({ className, label, onClick }: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={clsx('bg-gradient-to-b from-kournikova-300 to-salmon-400 text-black', className)}
      radius='full'
      size='3'
    >
      {label}
    </Button>
  )
}
