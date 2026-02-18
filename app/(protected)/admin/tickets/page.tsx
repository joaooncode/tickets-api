import { TicketsList } from "@/components/tickets-list";

export default function AdminTicketsPage() {
    return (
        <div className="flex flex-col items-start w-full">
            <h1 className="text-4xl font-bold">Todos os chamados</h1>
            <div className="w-full mt-8">
                <TicketsList />
            </div>
        </div>
    )
}