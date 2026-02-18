import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center mt-20 gap-4 h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground">Essa página não existe ou você não tem permissão para acessá-la.</p>
            <Link className="w-fit" href="/t/dashboard"><Button>Voltar para o dashboard</Button></Link>
        </div>
    )
}