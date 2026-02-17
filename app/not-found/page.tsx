import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div>
            <h1>404 - Página não encontrada</h1>
            <Link href="/"><Button>Voltar para a página inicial</Button></Link>
        </div>
    )
}