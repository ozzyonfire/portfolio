'use client';

import { Box, Divider, IconButton } from "@chakra-ui/react";
import { FileText, Github, Instagram, Linkedin, Mail } from "lucide-react";

function IconButtonLink(props: {
	icon: React.ReactElement,
	href: string,
	download?: string,
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
			href={props.href}
			target="_blank"
			rel="noopener noreferrer"
			download={props.download}
		/>
	)
}

export default function Footer() {
	return (
		<>
			<Divider my={6} />
			<Box
				display="flex"
				position="sticky"
				bottom={0}
				left={0}
				p={{
					base: 2,
				}}
				bg="#062363"
				alignItems="center"
				justifyContent="center"
				gap={2}
				roundedTop="md"
				shadow="dark-lg"
			>
				<IconButtonLink icon={<Github />} href="https://github.com/ozzyonfire" />
				<IconButtonLink icon={<Instagram />} href="https://instagram.com/ozzyonfire" />
				<IconButtonLink icon={<Mail />} href="mailto:mattoskamp@gmail.com" />
				<IconButtonLink icon={<Linkedin />} href="https://www.linkedin.com/in/mattoskamp/" />
				{/* <IconButtonLink icon={<FileText />} href="/pdf/Resume - Matt Oskamp.pdf" download="Matt Oskamp - Resume" /> */}
				<IconButtonLink icon={<FileText />} href="https://docs.google.com/document/d/1xKkQIbwG2Dx7iQyPPWsi3tUHldsBqbg2_Nto5sk5nNs/edit?usp=sharing" />
			</Box>
		</>
	)
}