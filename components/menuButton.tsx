import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"
import Link from "next/link"

interface MenuButtonProps extends ButtonProps {
	children: React.ReactNode
	href: string
	variant?: 'link' | 'a'
	download?: string
	target?: string
}

export default function MenuButton(props: MenuButtonProps) {
	const { variant = 'link', children, href, ...rest } = props

	return (
		<Button
			rounded="none"
			as={variant === 'link' ? Link : 'a'}
			href={props.href}
			target={props.target}
			download={props.download}
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