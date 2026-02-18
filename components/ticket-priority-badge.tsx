import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { TicketPriority } from "@/prisma/generated/prisma/browser";

export default function TicketPriorityBadge({ priority }: { priority: TicketPriority }) {
    return (
        <Badge className={cn(
            priority === "NORMAL" ? "bg-green-100 text-green-500" : priority === "URGENT" ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
        )}>
            {priority}
        </Badge>
    )
}