'use client'

import { useState } from 'react'
import type { TicketStatus } from '@/prisma/generated/prisma/client'
import type { TicketWithRelations } from '@/lib/types'
import AdminTicketsFilter from '@/components/admin-tickets-filter'
import AdminTicketCard from '@/components/admin-ticket-card'

export default function AdminTicketsListClient({
	tickets,
}: {
	tickets: TicketWithRelations[]
}) {
	const [selectedStatus, setSelectedStatus] = useState<TicketStatus | null>(null)

	const filteredTickets =
		selectedStatus === null
			? tickets
			: tickets.filter((t) => t.status === selectedStatus)

	return (
		<div className="flex flex-col gap-4 w-full">
			<AdminTicketsFilter
				tickets={tickets}
				selectedStatus={selectedStatus}
				onStatusSelect={setSelectedStatus}
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
