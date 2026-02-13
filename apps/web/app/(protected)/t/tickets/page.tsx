import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TicketsList from "@/components/tickets-list";
import { auth } from "@clerk/nextjs/server";

export default async function TicketsPage() {
    const { userId } = await auth()
    return (
        <>
            <div className="flex flex-col gap-4 w-full h-full">
                <h1 className="text-4xl font-bold">Chamados</h1>
                <Link href="/t/tickets/new" className="w-fit h-fit">
                    <Button variant="outline" className="cursor-pointer">
                        <PlusIcon />
                        Novo Chamado
                    </Button>
                </Link>
                <div className="flex flex-col gap-4 w-full">
                    <TicketsList userId={userId ? userId : ''} />
                </div>
            </div>
        </>
    )
}