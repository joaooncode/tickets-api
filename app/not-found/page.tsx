import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center mt-20 gap-4 h-screen">
            <h1>404 - Página não encontrada</h1>
            <Link className="w-fit" href="/t/dashboard"><Button>Voltar para o dashboard</Button></Link>
        </div>
    )
}