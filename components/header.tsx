'use client';

import { Avatar, Box, Heading } from "@chakra-ui/react";

export default function Header() {
	return (
		<Box
			display="flex"
			position="sticky"
			top={0}
			left={0}
			bg="transparent"
			sx={{
				width: '100%',
			}}
			p={4}
			alignItems="center"
		>
			<Avatar src="./img/profile.jpeg" name="Matt Oskamp" size="lg" />
			<Heading as="h1" size="md" ml={4}>
				Matt Oskamp
			</Heading>
		</Box>
	)
}