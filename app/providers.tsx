'use client'

import theme from '@/styles/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

export function Providers({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<CacheProvider>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ChakraProvider theme={theme}>
				{children}
			</ChakraProvider>
		</CacheProvider>
	)
}