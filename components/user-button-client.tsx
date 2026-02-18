'use client'

import { UserButton } from '@clerk/nextjs'

/**
 * Wrapper que renderiza o UserButton do Clerk apenas no cliente,
 * evitando hydration mismatch (servidor e cliente renderizam o mesmo placeholder).
 */
export function UserButtonClient() {
	return <UserButton />
}
