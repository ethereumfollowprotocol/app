import clsx from 'clsx'

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'
export const LIGHT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(212, 212, 212, 0.9) 0%, rgba(132, 132, 132, 0.2) 50%, rgba(212, 212, 212, 0.9) 100%)'

interface LoadingCellProps {
  className?: string
  gradient?: string
  isStatic?: boolean
}

const LoadingCell: React.FC<LoadingCellProps> = ({
  className,
  gradient = DEFAULT_LOADING_GRADIENT,
  isStatic
}) => {
  return (
    <div
      style={{
        background: gradient,
        backgroundSize: '400%',
        animationFillMode: 'forwards'
      }}
      className={clsx('bg-repeat-x', className, isStatic ? 'animate-none ' : 'animate-loading ')}
    />
  )
}

export default LoadingCell
