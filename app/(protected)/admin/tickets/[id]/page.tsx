import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ArrowLeftIcon,
    CalendarIcon,
    PaperclipIcon,
    UserIcon,
} from 'lucide-react'
import { getCurrentUserTicketById } from '@/app/(actions)/userActions'
import { TicketStatusBadge } from '@/components/status-badge'
import { TicketCommentForm } from '@/components/ticket-comment-form'
import type { TicketStatus } from '@/prisma/generated/prisma/client'
import Image from 'next/image'

function formatDateTime(date: Date): string {
    return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

function statusToLabel(status: TicketStatus): string {
    switch (status) {
        case 'OPEN':
            return 'Em aberto'
        case 'IN_PROGRESS':
            return 'Em andamento'
        case 'CLOSED':
            return 'Finalizado'
        default:
            return status
    }
}

export default async function AdminTicketPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getCurrentUserTicketById(id)

    if (!result.success || !result.data) {
        return (
            <div className="flex flex-col gap-4 w-full items-center">
                <div className="w-full max-w-2xl flex flex-col gap-2 items-start">
                    <Link href="/admin/tickets">
                        <Button variant="outline" className="cursor-pointer">
                            <ArrowLeftIcon />
                            Voltar
                        </Button>
                    </Link>
                    <p className="text-destructive" role="alert">
                        Ticket não encontrado ou você não tem permissão para acessá-lo.
                    </p>
                </div>
            </div>
        )
    }

    const ticket = result.data

    const sortedComments = [...ticket.comments].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full max-w-2xl flex flex-col gap-2 items-start">
                <Link href="/admin/tickets">
                    <Button variant="outline" className="cursor-pointer">
                        <ArrowLeftIcon />
                        Voltar
                    </Button>
                </Link>
                <div className="flex flex-row gap-4 items-center">
                    <h2 className="text-2xl font-bold">Chamado #{id}</h2>
                    <TicketStatusBadge status={statusToLabel(ticket.status)} />
                </div>
            </div>

            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex justify-between items-center gap-2">
                                <span className="text-sm">{ticket.title}</span>
                                <span className="text-sm">#{ticket.id.slice(0, 8)}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <div className="flex flex-col gap-2">
                                <div className="bg-gray-50 dark:bg-gray-900 px-2 py-4 rounded-md mb-2">
                                    <span className="text-sm text-foreground">
                                        {ticket.description}
                                    </span>
                                </div>
                                <div className="flex items-center gap-8 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                                            {ticket.user.name}
                                            {ticket.assignedTo
                                                ? ` · Responsável: ${ticket.assignedTo.name}`
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                                            {formatDateTime(ticket.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <div className="w-full max-w-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <PaperclipIcon className="w-5 h-5" />
                    Anexos
                </h3>
                <Card>
                    <CardContent className="pt-6">
                        {!ticket.attachments?.length ? (
                            <p className="text-sm text-muted-foreground py-4">
                                Nenhum anexo.
                            </p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {ticket.attachments.map((path, index) => {
                                    const filename = path.split('/').pop() ?? `Anexo ${index + 1}`
                                    const isImage = /\.(jpg|jpeg|png)$/i.test(filename)
                                    const label = `Abrir anexo ${index + 1}: ${filename}`
                                    return (
                                        <li key={path}>
                                            <a
                                                href={path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
                                            >
                                                {isImage ? (
                                                    // <img
                                                    // 	src={path}
                                                    // 	alt=""
                                                    // 	className="h-12 w-12 shrink-0 rounded object-cover"
                                                    // />
                                                    <Image src={path} alt="" width={100} height={100} />
                                                ) : (
                                                    <PaperclipIcon className="h-8 w-8 shrink-0 text-muted-foreground" />
                                                )}
                                                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                                    {filename}
                                                </span>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="w-full max-w-2xl">
                <h3 className="text-lg font-bold mb-4">
                    Comentários ({sortedComments.length})
                </h3>
                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                {sortedComments.length === 0 ? (
                                    <p className="text-sm text-muted-foreground py-4">
                                        Nenhum comentário ainda.
                                    </p>
                                ) : (
                                    sortedComments.map((comentario) => (
                                        <div
                                            key={comentario.id}
                                            className="flex flex-col gap-2 w-full bg-gray-100 dark:bg-gray-800 p-4 py-6 rounded-lg"
                                        >
                                            <div className="flex gap-2">
                                                <UserIcon className="w-4 h-4" />
                                                <span className="text-sm font-medium whitespace-nowrap">
                                                    {comentario.user.name}
                                                </span>
                                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                    {formatDateTime(comentario.createdAt)}
                                                </span>
                                            </div>
                                            <div className="ml-6 py-4">
                                                <span className="text-sm w-full">
                                                    {comentario.content}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <hr className="border-gray-200 dark:border-gray-700" />
                            <TicketCommentForm ticketId={ticket.id} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
