'use client'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    UserIcon,
    ClockIcon,
    Loader2Icon,
    CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";
import type { TicketStatus } from "@/prisma/generated/prisma/client";
import type { TicketWithRelations } from "@/lib/types";
import { toast } from "sonner";
import { updateTicketStatus } from "@/app/(actions)/adminActions";
import { useRouter } from "next/navigation";

export function TicketActions({
    ticket,
}: {
    ticket: TicketWithRelations;
}) {

    const router = useRouter();

    const handleStatusChange = async (id: string, status: TicketStatus) => {
        try {
            const result = await updateTicketStatus(id, status);

            if (result.success) {
                toast.success('Status do chamado atualizado com sucesso.');
                router.refresh();
            }

        } catch (error) {
            toast.error('Ocorreu um erro ao atualizar o status do chamado.');
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <EllipsisVerticalIcon /> Ações
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/admin/usuarios/${ticket.user.id}`} className="flex flex-row items-center gap-2 cursor-default">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Ver usuário
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Mudar status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'OPEN')}>
                                <ClockIcon className="mr-2 h-4 w-4 text-blue-500" />
                                Em aberto
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'IN_PROGRESS')}>
                                <Loader2Icon className="mr-2 h-4 w-4 text-yellow-500" />
                                Em andamento
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'CLOSED')}>
                                <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                                Finalizado
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}