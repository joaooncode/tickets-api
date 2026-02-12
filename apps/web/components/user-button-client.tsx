'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'

/**
 * Wrapper que renderiza o UserButton do Clerk apenas no cliente,
 * evitando hydration mismatch (servidor e cliente renderizam o mesmo placeholder).
 */
export function UserButtonClient() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div
				className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"
				aria-hidden
			/>
		)
	}

	return <UserButton />
}
