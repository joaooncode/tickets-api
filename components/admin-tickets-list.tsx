import { getAllTickets } from '@/app/(actions)/adminActions'
import AdminTicketsListClient from '@/components/admin-tickets-list-client'

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

	return <AdminTicketsListClient tickets={tickets.data} />
}
