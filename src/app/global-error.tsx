import { default as NextError } from 'next/error'

interface GlobalErrorProps {
  error: NextError & { digest?: string }
  reset: () => void
}

const GlobalError: React.FC<GlobalErrorProps> = ({ reset }) => {
  return (
    <html lang="en">
      <body className="pt-40">
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <NextError statusCode={undefined as any} />
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  )
}

export default GlobalError
