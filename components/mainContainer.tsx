'use client';

import { Box, Container } from "@chakra-ui/react";

export default function MainContainer(props: {
	children: React.ReactNode
}) {
	return (
		<Box minHeight="100vh" display="flex" flexDir="column" alignItems="center" justifyContent="center"
			w="full"
		>
			{props.children}
		</Box>
	)
}