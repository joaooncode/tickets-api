import { getCreatedTicketsByUserId } from '@/app/(actions)/_actions'
import { ListStatus } from '@/components/list-status'
import { ListTickets } from '@/components/list-tickets'
import type { Ticket } from '@/lib/types'

function toTicket(t: {
    id: string
    title: string
    description: string
    userId: string
    assignedToId: string | null
    status: string
    createdAt: Date
    comments?: unknown[]
}): Ticket {
    return {
        id: t.id,
        title: t.title,
        description: t.description,
        user_id: t.userId,
        assigned_to: t.assignedToId,
        status: t.status,
        priority: 'Normal',
        created_at: t.createdAt.getTime(),
        comments_count: t.comments?.length ?? 0,
    }
}

interface DashboardPageProps {
    searchParams: Promise<{ status?: string }> | { status?: string }
}

export default async function Dashboard({ searchParams }: DashboardPageProps) {
    const resolvedParams =
        typeof searchParams === 'object' && searchParams !== null && 'then' in searchParams
            ? await searchParams
            : searchParams
    const statusFilter = resolvedParams?.status ?? null

    const result = await getCreatedTicketsByUserId()

    if (!result.success) {
        return (
            <div className="flex flex-col items-start w-full">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="mt-4 text-destructive">
                    Erro: {result.error}
                </div>
            </div>
        )
    }

    const tickets = result.data.map(toTicket)
    const filteredTickets =
        !statusFilter || statusFilter === 'Total'
            ? tickets
            : tickets.filter((t) => t.status === statusFilter)


    return (
        <div className="flex flex-col items-start w-full">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <ListStatus tickets={tickets} currentStatus={statusFilter} />
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Meus chamados</h2>
            </div>
            <ListTickets tickets={filteredTickets} />
        </div>
    )
}
