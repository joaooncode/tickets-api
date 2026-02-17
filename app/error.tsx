'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalErrorPage() {
    return (
        <div className="flex flex-col items-center mt-20 gap-4 h-screen">
            <h1 className="text-4xl font-bold">Algo deu errado</h1>
            <Link className="w-fit" href="/t/dashboard"><Button>Voltar para o dashboard</Button></Link>
        </div>
    )
}   