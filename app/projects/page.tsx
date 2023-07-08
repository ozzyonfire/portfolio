'use client';

import Card from "@/components/card";
import MenuButton from "@/components/menuButton";
import { Box, Container, Divider, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import projects from './data.json';

export default function ProjectsPage() {
	return (
		<Container maxW="container.lg">
			<Box
				display="flex"
				flexDirection={{
					base: 'column-reverse',
					md: 'row'
				}}
				alignItems="center"
				px={{
					base: 4,
					md: 16
				}}
				gap={{
					base: 4,
					md: 16
				}}
			>
				<Stack gap={4}>
					<Heading>
						Projects
					</Heading>
					<Text>
						Here are some of the personal and professional projects I&apos;ve worked on. I&apos;m always looking for new opportunities to learn and grow. I enjoy working on Game Design, Web and Software Development projects.
					</Text>
					<MenuButton href="#projects">
						View Projects
					</MenuButton>
				</Stack>
				<img
					src="/svg/programming.svg"
					alt="Programming"
					width={400}
				/>
			</Box>
			<SimpleGrid
				id="projects"
				mt={16}
				px={{
					base: 4,
					md: 16
				}}
				columns={{
					base: 1,
					md: 2,
					lg: 3
				}} spacing={4}>
				{projects.map((project, i) => (
					<Card
						title={project.title}
						key={i}
						image={project.image}
						slug={project.slug}
					>
						<Text>{project.shortDescription}</Text>
					</Card>
				))}
			</SimpleGrid>
		</Container>
	)
}