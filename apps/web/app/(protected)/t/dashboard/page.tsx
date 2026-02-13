import { ticketService } from '@/services/old-ticket.service'
import { ListStatus } from '@/components/list-status'
import { ListTickets } from '@/components/list-tickets'

interface DashboardPageProps {
    searchParams: Promise<{ status?: string }> | { status?: string }
}

export default async function Dashboard({ searchParams }: DashboardPageProps) {
    const resolvedParams =
        typeof searchParams === 'object' && searchParams !== null && 'then' in searchParams
            ? await searchParams
            : searchParams
    const statusFilter = resolvedParams?.status ?? null

    const result = await ticketService.getAllTickets()

    if (result.isErr()) {
        return (
            <div className="flex flex-col items-start w-full">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="mt-4 text-destructive">
                    Erro: {result.error.message}
                </div>
            </div>
        )
    }

    const tickets = result.value
    const filteredTickets =
        !statusFilter || statusFilter === 'Total'
            ? tickets
            : tickets.filter((t) => t.status === statusFilter)


    return (
        <div className="flex flex-col items-start w-full">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <ListStatus tickets={tickets} currentStatus={statusFilter} />
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Recentes</h2>
            </div>
            <ListTickets tickets={filteredTickets} />
        </div>
    )
}
