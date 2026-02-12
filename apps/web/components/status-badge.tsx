import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

/**
 * StatusBadge component to display the status of a ticket
 * @param status - The status of the ticket
 * @returns A badge with the status of the ticket
 */
export function TicketStatusBadge({ status }: { status: string }) {
    return (
        <Badge
            className={cn(
                status === "Em aberto" ? "bg-blue-100 text-blue-500" : status === "Em andamento" ? "bg-yellow-100 text-yellow-800" : status === "Finalizado" ? "bg-green-100 text-green-600" : status === "Aguardando sua resposta" ? "bg-orange-100 text-orange-500" : "bg-gray-100 text-black"
            )}
        >
            {status}
        </Badge>
    )
}