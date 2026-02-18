import { getAllTickets } from '@/app/(actions)/adminActions'
import TicketsListClient from '@/components/tickets-list-client'

export async function AdminTicketsList() {
	const tickets = await getAllTickets()

	if (!tickets.success || !tickets.data) {
		return (
			<div className="flex flex-col items-start w-full">
				<div className="mt-4 text-destructive">
					Algo deu errado. Tente novamente em instantes.
				</div>
			</div>
		)
	}

	return <TicketsListClient tickets={tickets.data} isAdmin={true} />
}
