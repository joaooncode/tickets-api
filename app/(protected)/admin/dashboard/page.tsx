import { getAllTickets } from '@/app/(actions)/adminActions'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TicketCategoryChart from './ticket-category-chart'
import TicketStatusChart from './ticket-status-chart'

export default async function AdminDashboardPage() {
    const tickets = await getAllTickets()

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <TicketStatusChart tickets={tickets.data ?? []} />
                <TicketCategoryChart tickets={tickets.data ?? []} />
            </div>

        </div>
    )
}