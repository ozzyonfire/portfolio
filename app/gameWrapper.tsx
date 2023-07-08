'use client';

import BlockDrop from "@/components/blockDrop";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState } from "react";

export default function GameWrapper(props: {
	children: React.ReactNode
}) {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<>
			<Header
				isPlaying={isPlaying}
				onStartPlaying={() => {
					setIsPlaying(true);
				}}
				onEndPlaying={() => {
					setIsPlaying(false);
				}}
			/>
			{isPlaying ?
				<BlockDrop />
				:
				props.children
			}
			<div style={{ flexGrow: 1 }}></div>
			<Footer />
		</>
	)
}