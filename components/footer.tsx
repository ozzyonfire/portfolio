'use client';

import { Box, IconButton } from "@chakra-ui/react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

function IconButtonLink(props: {
	icon: React.ReactElement,
}) {
	return (
		<IconButton
			aria-label="Github"
			icon={props.icon}
			variant="ghost"
			rounded="full"
			colorScheme="blue"
			size="lg"
			as="a"
			href=""
			target="_blank"
			rel="noopener noreferrer"
		/>
	)
}

export default function Footer() {
	return (
		<Box
			display="flex"
			position="sticky"
			bottom={0}
			left={0}
			pb={{
				base: 2,
				md: 6
			}}
			bg="transparent"
			w="full"
			alignItems="center"
			justifyContent="center"
			gap={2}
		>
			<IconButtonLink icon={<Github />} />
			<IconButtonLink icon={<Instagram />} />
			<IconButtonLink icon={<Mail />} />
			<IconButtonLink icon={<Linkedin />} />
		</Box>
	)
}