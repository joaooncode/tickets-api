import TicketCard from "@/components/ticket-card";
import { getTickets } from "@/services/ticket.service";

export default async function TicketsList() {
    const tickets = await getTickets()
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