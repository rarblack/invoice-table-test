'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { Provider } from '@/contexts/common'

export function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Provider>
          {children}
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}