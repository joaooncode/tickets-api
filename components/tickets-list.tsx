import TicketCard from "@/components/ticket-card"
import type { Ticket } from "@/lib/types"
import { getCreatedTicketsByUserId } from "@/app/(actions)/_actions"

function toTicketCardTicket(t: {
	id: string
	title: string
	description: string
	userId: string
	assignedToId: string | null
	status: string
	createdAt: Date
	comments: unknown[]
}): Ticket {
	return {
		id: t.id,
		title: t.title,
		description: t.description,
		user_id: t.userId,
		assigned_to: t.assignedToId,
		status: t.status,
		priority: "Normal",
		created_at: t.createdAt.getTime(),
		comments_count: t.comments?.length ?? 0,
	}
}

export default async function TicketsList() {
	const result = await getCreatedTicketsByUserId()
	if (!result.success) {
		if (
			result.error.includes("logado") ||
			result.error.includes("Usuário não encontrado")
		) {
			return <div>Você ainda não possui nenhum chamado</div>
		}
		return <div>Erro: {result.error}</div>
	}
	const tickets = result.data.map(toTicketCardTicket)
	return (
		<div>
			{tickets.length === 0 ? (
				<div>Você ainda não possui nenhum chamado</div>
			) : (
				tickets.map((ticket) => (
					<TicketCard key={ticket.id} ticket={ticket} />
				))
			)}
		</div>
	)
}
