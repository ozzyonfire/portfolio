import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { Recursive } from 'next/font/google'
const recursive = Recursive({
	subsets: ['latin'],
	variable: '--recursive-font',
	weight: 'variable',
	style: 'normal',
	display: 'swap',
	axes: ["CASL", "CRSV", "MONO", "slnt"],
});

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const ozzy = {
	100: "#4E84F9",
	200: "#3D6AF9",
	300: "#2C50F9",
	400: "#1B36F9",
	500: "#0A1CF9",
	600: "#0A16C2",
	700: "#07108B",
	800: "#040B54",
	900: "#02051D",
};

const theme = extendTheme({
	config,
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				color: mode("gray.800", "#EEF3FE")(props),
				bg: mode("gray.50", "#021234")(props),
			},
		}),
	},
	fonts: {
		heading: recursive.style.fontFamily,
		body: recursive.style.fontFamily,
	}
});

export default theme;