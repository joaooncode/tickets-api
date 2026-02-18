import { getCurrentUserTickets } from '@/app/(actions)/userActions'
import TicketCard from '@/components/ticket-card'
import type { TicketWithRelations } from '@/lib/types'

export async function TicketsList() {
	const tickets = await getCurrentUserTickets()

	if (!tickets.success || !tickets.data) {
		return (
			<div className="flex flex-col items-start w-full">
				<div className="mt-4 text-destructive">
					Algo deu errado. Tente novamente em instantes.
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			{tickets.data.map((ticket: TicketWithRelations) => (
				<TicketCard key={ticket.id} ticket={ticket} />
			))}
		</div>
	)
}
