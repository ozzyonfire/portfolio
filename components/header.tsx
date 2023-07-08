'use client';

import { Avatar, Box, Heading, IconButton } from "@chakra-ui/react";
import { Gamepad, X } from "lucide-react";
import Link from "next/link";

export default function Header(props: {
	onStartPlaying: () => void
	onEndPlaying: () => void
	isPlaying: boolean
}) {
	return (
		<Box
			display="flex"
			top={0}
			left={0}
			bg="transparent"
			sx={{
				width: '100%',
			}}
			p={4}
			alignItems="center"
			flexShrink={1}
		>
			<Avatar src="./img/profile.jpeg" name="Matt Oskamp" size="lg" />
			<Link href="/">
				<Heading as="h1" size="md" ml={4}>
					Matt Oskamp
				</Heading>
			</Link>
			<Box flexGrow={1} />
			<IconButton
				aria-label="Play game"
				onClick={
					props.isPlaying ? props.onEndPlaying :
						props.onStartPlaying
				}
				icon={
					props.isPlaying ? <X /> :
						<Gamepad />
				}
			/>
		</Box>
	)
}