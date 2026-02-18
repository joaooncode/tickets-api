'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    console.error("[Error boundary]", error)
    return (
        <div className="flex flex-col items-center mt-20 gap-4 h-screen">
            <h1 className="text-4xl font-bold">Algo deu errado</h1>
            <div className="flex gap-2">
                <Button onClick={reset}>
                    Tentar novamente
                </Button>
                <Link className="w-fit" href="/t/dashboard">
                    <Button variant="outline">Voltar para o dashboard</Button>
                </Link>
            </div>
        </div>
    )
}   