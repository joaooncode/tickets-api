export default function AdminTicketPage({ params }: { params: { ticketId: string } }) {
    return (
        <div>
            <h1>Chamado {params.ticketId}</h1>
        </div>
    )
}