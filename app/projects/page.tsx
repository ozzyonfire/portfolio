'use client';

import Card from "@/components/card";
import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function ProjectsPage() {
	return (
		<Container maxW="container.xl">
			<Heading>
				Projects
			</Heading>
			<SimpleGrid columns={{
				base: 1,
				md: 2,
				lg: 3
			}} spacing={4}>
				{Array.apply(null, Array(24)).map((_, i) => (
					<Card title="The Preferred Lie" key={i}>
						<Text>
							An app for golfers to track their scores and stats.
						</Text>
					</Card>
				))}
			</SimpleGrid>
		</Container>
	)
}