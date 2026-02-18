import { getAllTickets } from '@/app/(actions)/adminActions'
import { Card, CardContent } from '@/components/ui/card'
import TicketCategoryChart from './ticket-category-chart'
import TicketPriorityChart from './ticket-priority-chart'
import TicketStatusChart from './ticket-status-chart'
import TicketsOpenedThisWeekCard from './tickets-opened-this-week'

export default async function AdminDashboardPage() {
    const tickets = await getAllTickets()

    return (
        <div className="flex flex-col gap-4 w-full h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Card className="w-full h-screen shadow-lg">
                <CardContent className="px-16">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2">
                            <TicketStatusChart tickets={tickets.data ?? []} />
                        </div>
                        <div className="col-span-2">
                            <TicketCategoryChart tickets={tickets.data ?? []} />
                        </div>
                        <div className="col-span-1">
                            <TicketPriorityChart tickets={tickets.data ?? []} />
                        </div>
                        <div className="col-span-1">
                            <TicketsOpenedThisWeekCard tickets={tickets.data ?? []} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}