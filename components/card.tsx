'use client';

import { CardBody, Card as ChakraCard, Heading } from "@chakra-ui/react";


export default function Card(props: {
	children: React.ReactNode
	title: string
}) {
	const {
		children,
		title
	} = props;

	return (
		<ChakraCard
			bg="#084AD9"
		>
			<CardBody>
				<Heading size="md">{title}</Heading>
				{children}
			</CardBody>
		</ChakraCard>
	)
}