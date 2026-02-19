import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TicketWithRelations } from "@/lib/types";

export default function TicketsOpenedThisWeekCard({ tickets }: { tickets: TicketWithRelations[] }) {
    const ticketsOpenedThisWeek = tickets.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt)
        const startOfWeek = new Date()
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
        const endOfWeek = new Date()
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()))
        return ticketDate >= startOfWeek && ticketDate <= endOfWeek
    })

    return (
        <Card className="h-50 w-70">
            <CardHeader>
                <CardTitle>Chamados abertos esta semana</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{ticketsOpenedThisWeek.length}</p>
            </CardContent>
        </Card>
    )
}