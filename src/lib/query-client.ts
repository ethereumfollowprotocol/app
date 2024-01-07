import * as React from 'react'
import { QueryClient } from '@tanstack/react-query'

export const getQueryClient = React.cache(() => new QueryClient())
