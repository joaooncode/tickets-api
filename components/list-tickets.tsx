import TicketCard from '@/components/ticket-card'
import type { Ticket } from '@/lib/types'

export interface ListTicketsProps {
	tickets: Ticket[]
}

export function ListTickets({ tickets }: ListTicketsProps) {
	return (
		<div className="flex flex-col gap-4 w-full">
			{tickets.map((ticket) => (
				<TicketCard key={ticket.id} ticket={ticket} />
			))}
		</div>
	)
}
