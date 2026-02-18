import { getCurrentUserTickets } from '@/app/(actions)/userActions'
import { getAllTickets, isCurrentUserAdmin } from '@/app/(actions)/adminActions'
import TicketsListClient from './tickets-list-client'

export async function TicketsList() {
	const userTickets = await getCurrentUserTickets()
	const allTickets = await getAllTickets()
	const isAdmin = await isCurrentUserAdmin()

	if (!userTickets.success || !userTickets.data || !allTickets.success || !allTickets.data) {
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
			{isAdmin ? (
				<TicketsListClient tickets={allTickets.data} isAdmin={true} />
			) : (
				<TicketsListClient tickets={userTickets.data} isAdmin={false} />
			)}
		</div>
	)
}
