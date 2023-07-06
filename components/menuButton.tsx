import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"
import Link from "next/link"

interface MenuButtonProps extends ButtonProps {
	children: React.ReactNode
	href: string
}

export default function MenuButton(props: MenuButtonProps) {
	const { children, href, ...rest } = props

	return (
		<Button
			rounded="none"
			as={Link}
			href={props.href}
			sx={{
				overflow: 'hidden',
				border: '1px solid #CBDAFC',
			}}
			_before={{
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				bg: '#CBDAFC',
				zIndex: -12,
				transform: 'translateX(-100%)',
				transition: 'all 0.1s ease-in-out',
			}}
			_hover={{
				_before: {
					transform: 'translateX(0)',
				},
				color: '#021234',
			}}
			{...rest}
		>
			{children}
		</Button>
	)
}