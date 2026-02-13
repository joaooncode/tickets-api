import TicketCard from "@/components/ticket-card";
import { ticketService } from "@/services/old-ticket.service";

export default async function TicketsList({ userId }: { userId: string }) {
    const tickets = await ticketService.getUserTickets(userId)
    if (tickets.isErr()) {
        if (tickets.error.type === 'NOT_FOUND') {
            return <div>Você ainda não possui nenhum chamado</div>
        }
        return <div>Error: {tickets.error.message}</div>
    }
    console.log(tickets.value)
    return (
        <div>
            {tickets.value.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    )
}