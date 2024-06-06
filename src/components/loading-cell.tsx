import clsx from 'clsx'

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'

interface LoadingCellProps {
  className?: string
  gradient?: string
}

const LoadingCell: React.FC<LoadingCellProps> = ({
  className,
  gradient = DEFAULT_LOADING_GRADIENT
}) => {
  return (
    <div
      style={{
        background: gradient,
        backgroundSize: '400%',
        animationFillMode: 'forwards'
      }}
      className={clsx('animate-loading bg-repeat-x', className)}
    />
  )
}

export default LoadingCell
