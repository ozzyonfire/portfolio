import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function GridBackground() {
	const [columns, setColumns] = useState(12);
	const [rows, setRows] = useState(6);
	const [boxSize, setBoxSize] = useState(200);
	const [gapSize, setGapSize] = useState(0);

	useEffect(() => {
		const calculateScreenSize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			console.log(width, height);

			// based on the width and height make a decision on how many columns and rows to use
			const columns = Math.floor(width / (boxSize + gapSize));
			const rows = Math.floor(height / (boxSize + gapSize));

			setColumns(columns);
			setRows(rows);
		}

		calculateScreenSize();

		window.addEventListener('resize', calculateScreenSize);

		return () => {
			window.removeEventListener('resize', calculateScreenSize);
		}
	}, [boxSize, gapSize]);

	return (
		// <SimpleGrid columns={12} spacing={1}>
		// 	{Array.from({ length: 12 * 12 }).map((_, i) => (
		// 		<Box
		// 			key={i}
		// 			sx={{
		// 				backgroundColor: 'rgba(0, 0, 0, 0.1)',
		// 				transition: 'background-color 0.2s',
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 			_hover={{
		// 				backgroundColor: 'rgba(0, 0, 0, 0.2)',
		// 			}}
		// 		/>
		// 	))}
		// </SimpleGrid>

		<Grid sx={{
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100vh',
			width: '100vw',
			padding: 16,
			overflow: 'hidden',
		}} templateColumns={`repeat(${columns}, 1fr)`} gap={gapSize}>
			{Array.from({ length: columns * rows }).map((_, i) => (
				<Box
					key={i}
					sx={{
						// rounded: '50%',
						// backgroundColor: 'rgba(0, 0, 0, 0.1)',
						backgroundColor: '#020C23',
						opacity: 0,
						transform: 'scale(0.9)',
						transition: 'background-color 0.2s, transform 0.2s, opacity 2s ease',
					}}
					_hover={{
						// backgroundColor: 'rgba(0, 0, 0, 0.2)',
						transform: 'scale(1.04)',
						opacity: 1,
						// zIndex: -1
					}}
				/>
			))}
		</Grid>
	)
}