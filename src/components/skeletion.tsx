import clsx from 'clsx'
import * as React from 'react'
import { Container } from '@radix-ui/themes'
export async function Skeleton(props: { className?: string; children?: React.ReactNode }) {
  return (
    <Container
      className={clsx([
        props.className,
        'container mx-auto mt-8 w-full max-w-sm animate-pulse rounded-lg border bg-gray-50/50 p-4 shadow',
      ])}
    >
      {props.children}
    </Container>
  )
}
