'use client';

import MenuButton from "@/components/menuButton";
import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Main() {
	const fireRef = useRef<HTMLDivElement>(null);
	const [fireState, setFireState] = useState<'start' | 'burn' | 'end' | 'out'>('out');
	const frameLength = 100;
	const animationRef = useRef<Animation>();

	useEffect(() => {
		return () => {
			setFireState('end');
		}
	}, []);

	useEffect(() => {
		const animateFire = () => {
			if (fireRef.current) {
				switch (fireState) {
					case 'start':
						fireRef.current.animate([
							{
								background: 'url("/img/sprites/blue/start/burning_start_2.png")',
								backgroundPosition: '0px'
							},
							{
								background: 'url("/img/sprites/blue/start/burning_start_2.png")',
								backgroundPosition: '-80px'
							}
						], {
							fill: 'forwards',
							duration: frameLength * 4,
							iterations: 1,
							easing: 'steps(4)'
						}).onfinish = () => {
							setFireState('burn');
						}
						break;
					case 'burn':
						animationRef.current = fireRef.current.animate([
							{
								background: 'url("/img/sprites/blue/loops/burning_loop_2.png")',
								backgroundPosition: '0px'
							},
							{
								background: 'url("/img/sprites/blue/loops/burning_loop_2.png")',
								backgroundPosition: '-160px'
							}
						], {
							duration: frameLength * 8,
							iterations: Infinity,
							easing: 'steps(8)'
						});
						break;
					case 'end':
						if (animationRef.current) {
							console.log('cancelling');
							animationRef.current.cancel();
						}
						fireRef.current.animate([
							{
								background: 'url("/img/sprites/blue/end/burning_end_2.png")',
								backgroundPosition: '0px'
							},
							{
								background: 'url("/img/sprites/blue/end/burning_end_2.png")',
								backgroundPosition: '-100px'
							}
						], {
							fill: 'forwards',
							duration: frameLength * 5,
							iterations: 1,
							easing: 'steps(5)'
						}).onfinish = () => {
							setFireState('out');
						}
						break;
					case 'out':
						fireRef.current.animate([
							{
								// background: 'url("/img/sprites/blue/start/burning_start_2.png")',
								background: 'transparent',
								backgroundPosition: '0px',
							}
						], {
							fill: 'forwards',
							duration: 1,
							iterations: 1,
						});
						break;
				}
			}
		}
		animateFire();
	}, [fireState]);

	useEffect(() => {
		setTimeout(() => {
			setFireState('start');
		}, 2000);
	}, []);

	const handleFireClick = () => {
		switch (fireState) {
			case 'out':
				setFireState('start');
				break;
			case 'burn':
				setFireState('end');
				break;
		}
	}

	return (
		<Stack spacing={0} alignItems="center" pt={24}>
			<Center position="relative">
				{/* <Box
						position="absolute"
						bottom={0}
						left={0}
						sx={{
							transform: 'translate(50%, 0%)',
							zIndex: -1,
							width: '100%',
						}}
					>
						<div className="fire-start"></div>
					</Box> */}
				<Heading
					className="heading glow"
					lineHeight={1}
					sx={{
						fontVariationSettings: `'slnt' -12, 'MONO' 1`,
					}}
				>
					<Flex>
						<Box className="slide-right">ozzy</Box>
						<Box className="slide-down">on</Box>
						<Box
							className="slide-left">
							fire
						</Box>
					</Flex>
					<Box position="absolute" top="0" className="fade-in" onClick={handleFireClick}>ozzyonfire</Box>
				</Heading>
			</Center>
			<Center>
				<div ref={fireRef} className="fire"></div>
			</Center>
			<Text
				pt={4}
				maxW={300}
				textAlign={{
					base: 'center',
					md: 'left'
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis. Egestas sed tempus urna et pharetra. Ac tortor vitae purus faucibus ornare.
			</Text>
			{/* <Card /> */}
			<Stack spacing={1.5} pt={4} w={300}>
				{/* <MenuButton
					href="/about"
				>
					About
				</MenuButton> */}
				<MenuButton
					href="https://docs.google.com/document/d/1xKkQIbwG2Dx7iQyPPWsi3tUHldsBqbg2_Nto5sk5nNs/edit?usp=sharing"
					target="_blank"
					rightIcon={<ExternalLink size={15} />}
				>
					Resumé
				</MenuButton>
				<MenuButton
					href="/projects"
				>
					Projects
				</MenuButton>
				<MenuButton
					href="mailto:mattoskamp@gmail.com"
				>
					Contact
				</MenuButton>
			</Stack>
		</Stack>
	)
}