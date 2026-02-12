import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function TicketsPage() {
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
            </div>
        </>
    )
}