'use client'

import { useState } from 'react'
import type { TicketPriority, TicketStatus } from '@/prisma/generated/prisma/browser'
import type { TicketWithRelations } from '@/lib/types'
import AdminTicketsFilter from '@/components/admin-tickets-filter'
import AdminTicketCard from '@/components/admin-ticket-card'

export default function AdminTicketsListClient({
	tickets,
}: {
	tickets: TicketWithRelations[]
}) {
	const [selectedStatus, setSelectedStatus] = useState<TicketStatus | null>(null)
	const [selectedPriority, setSelectedPriority] =
		useState<TicketPriority | null>(null)

	let filteredTickets = tickets
	if (selectedStatus !== null) {
		filteredTickets = filteredTickets.filter((t) => t.status === selectedStatus)
	}
	if (selectedPriority !== null) {
		filteredTickets = filteredTickets.filter(
			(t) => t.priority === selectedPriority,
		)
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			<AdminTicketsFilter
				tickets={tickets}
				selectedStatus={selectedStatus}
				onStatusSelect={setSelectedStatus}
				selectedPriority={selectedPriority}
				onPrioritySelect={setSelectedPriority}
			/>
			<div className="flex flex-col gap-4 mt-8">
				{filteredTickets.length === 0 ? (
					<div className="flex flex-col gap-2 items-center justify-center">
						<p className="text-sm text-muted-foreground">Nenhum ticket encontrado</p>
					</div>
				) : (
					filteredTickets.map((ticket) => (
						<AdminTicketCard key={ticket.id} ticket={ticket} />
					))
				)}
			</div>
		</div>
	)
}
