'use client'

import type { TicketStatus } from '@/prisma/generated/prisma/client'
import type { TicketWithRelations } from '@/lib/types'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminTicketsFilterProps {
	tickets: TicketWithRelations[]
	selectedStatus: TicketStatus | null
	onStatusSelect: (status: TicketStatus | null) => void
}

export default function AdminTicketsFilter({
	tickets,
	selectedStatus,
	onStatusSelect,
}: AdminTicketsFilterProps) {
	const totalTickets = tickets.length
	const openTickets = tickets.filter((t) => t.status === 'OPEN').length
	const inProgressTickets = tickets.filter(
		(t) => t.status === 'IN_PROGRESS',
	).length
	const closedTickets = tickets.filter((t) => t.status === 'CLOSED').length

	const cards = [
		{ label: 'Total', count: totalTickets, status: null as TicketStatus | null },
		{ label: 'em aberto', count: openTickets, status: 'OPEN' as const },
		{
			label: 'em andamento',
			count: inProgressTickets,
			status: 'IN_PROGRESS' as const,
		},
		{ label: 'resolvido', count: closedTickets, status: 'CLOSED' as const },
	]

	return (
		<div className="grid grid-cols-4 gap-4 w-full">
			{cards.map(({ label, count, status }) => {
				const isSelected = selectedStatus === status
				return (
					<Card
						key={label}
						className={cn(
							'col-span-1 cursor-pointer transition-colors hover:bg-muted/50',
							isSelected && 'ring-2 ring-primary bg-muted',
						)}
						onClick={() => onStatusSelect(status)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								onStatusSelect(status)
							}
						}}
					>
						<CardHeader>
							<CardTitle className="flex flex-row gap-4 items-center">
								<div>
									<ChartBarIcon className="w-4 h-4 text-muted-foreground" />
								</div>
								<div className="flex flex-col gap-2 items-start justify-center">
									<span>{label}</span>
									<span>{count}</span>
								</div>
							</CardTitle>
						</CardHeader>
					</Card>
				)
			})}
		</div>
	)
}