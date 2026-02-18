import { getCurrentUserTickets } from '@/app/(actions)/userActions'
import AdminTicketsListClient from '@/components/tickets-list-client'

export async function UserTicketsList() {
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

	return <AdminTicketsListClient tickets={tickets.data} />
}
