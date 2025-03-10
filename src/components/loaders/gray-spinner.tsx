interface GraySpinnerProps {
  size?: number
}

const GraySpinner = ({ size = 24 }: GraySpinnerProps) => {
  return <div style={{ width: size, height: size }} className='gray-loader'></div>
}

export default GraySpinner
