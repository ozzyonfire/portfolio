'use client';

import MenuButton from "@/components/menuButton";
import { Box, Container, Flex, Text, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider } from "@chakra-ui/react"
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Project {
	title: string
	slug: string
	shortDescription: string
	longDescription: string
	image: string
	stack: string
	repo?: string
	link: string
}

export default function Project(props: {
	project: Project
}) {
	const { project } = props;

	return (
		<Container maxWidth="container.lg">
			<Breadcrumb>
				<BreadcrumbItem>
					<BreadcrumbLink as={Link} href="/projects">
						Projects
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink>
						{project.title}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<Flex
				flexDirection={{
					base: 'column-reverse',
					md: 'row'
				}}
				pt={16} gap={{
					base: 4,
					md: 16
				}}
			>
				<Box
					display="flex"
					flexDirection="column"
					gap={4}
					maxW={{
						base: '100%',
						md: '50%'
					}}
				>
					<Text
					>{project.longDescription}</Text>
					<Box
						display="flex"
						gap={4}
					>
						<MenuButton
							href={project.link}
							rightIcon={<ExternalLink size={15} />}
							as="a"
							target="_blank"
						>
							View Project
						</MenuButton>
						{project.repo && (
							<MenuButton
								href={project.repo}
								rightIcon={<Github size={15} />}
								as="a"
								target="_blank"
							>
								View Repository
							</MenuButton>
						)}
					</Box>
				</Box>
				<Box
					position="relative"
					rounded="lg"
					overflow="hidden"
				>
					<Image
						src={project.image}
						alt={project.title}
						width={800}
						height={800}
						objectFit="cover"
					/>
				</Box>
			</Flex>
			<Divider my={16} />
			<Box
				display="flex"
				gap={{
					base: 4,
					md: 16
				}}
				flexDirection={{
					base: 'column',
					md: 'row'
				}}
			>
				<Box
					rounded="lg"
					overflow="hidden"
					width={400}
				>
					<Image
						src="/img/projects/installing.png"
						alt="Installing"
						width={400}
						height={400}
						objectFit="cover"
					/>
				</Box>
				<Box
					maxW={{
						base: '100%',
						md: '70%'
					}}
				>
					<Heading>
						Tech Stack
					</Heading>
					<Text>
						{project.stack}
					</Text>
				</Box>
			</Box>
		</Container>
	)
}