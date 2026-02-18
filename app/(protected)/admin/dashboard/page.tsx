import { getAllTickets } from '@/app/(actions)/adminActions'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboardPage() {
    const tickets = await getAllTickets()

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* cards de status e quantidade de chamados */}
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    {tickets.success && tickets.data && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Chamados abertos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {tickets.data.filter(
                                        (ticket) => ticket.status === 'OPEN'
                                    ).length}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            {/* chamados abertos essa semana */}


        </div>
    )
}