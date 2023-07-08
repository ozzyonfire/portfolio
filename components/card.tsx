'use client';

import { Box, Button, CardBody, Card as ChakraCard, Heading } from "@chakra-ui/react";
import { ChevronsRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Card(props: {
	children: React.ReactNode
	title: string
	image: string
	slug: string
}) {
	const {
		children,
		title,
		image,
		slug
	} = props;

	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<Box position="relative" width="100%" height={200} rounded="lg" overflow="hidden">
				<Image
					src={image}
					alt={title}
					fill
					style={{
						objectFit: 'cover'
					}}
				/>
			</Box>
			<Heading size="md" mt={4}>{title}</Heading>
			{children}
			<Box>
				<Box as={Link} href={`/projects/${slug}`} display="flex" alignItems="center" gap={1} textTransform="uppercase" fontSize="sm"
					color="#CBDAFC" fontWeight="bold"
					transition="all 0.1s ease-in-out"
					w="fit-content"
					_hover={{
						color: '#AAC3FA',
						'--move-right': '0.25rem',
						gap: '0.5rem',
					}}
				>
					<span>Read more</span>
					<ChevronsRight />
				</Box>
			</Box>
		</Box>
	)
}