'use client';

import { Box, Container } from "@chakra-ui/react";

export default function MainContainer(props: {
	children: React.ReactNode
}) {
	return (
		<Box pt={{
			base: 36,
		}} height="100vh" display="flex" flexDir="column" alignItems="center" justifyContent="center"
			w="full"
			position="relative"
		>
			{props.children}
		</Box>
	)
}