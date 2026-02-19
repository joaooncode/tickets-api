'use client'

import { useRouter } from 'next/navigation'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { CalendarIcon, MessageSquareIcon } from 'lucide-react'
import type { TicketWithRelations } from '@/lib/types'
import { TICKET_SETORES } from '@/lib/schemas'
import { TicketStatusBadge } from '@/components/status-badge'
import { TicketStatus } from '@/prisma/generated/prisma/browser'
import TicketPriorityBadge from '@/components/ticket-priority-badge'
import { Badge } from '@/components/ui/badge'

function formatCreatedAt(createdAt: Date): string {
	const date = new Date(createdAt)
	return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

const statusToLabel = (status: TicketStatus) => {
	switch (status) {
		case "OPEN":
			return "Em aberto"
		case "IN_PROGRESS":
			return "Em andamento"
		case "CLOSED":
			return "Finalizado"
	}
}

export default function AdminTicketCard({ ticket }: { ticket: TicketWithRelations }) {
	const router = useRouter()
	const createdAtFormatted = formatCreatedAt(ticket.createdAt)
	const commentsCount = ticket.comments.length

	function handleClick() {
		router.push(`/admin/tickets/${ticket.id}`)
	}

	return (
		<Card
			className="w-full cursor-pointer transition-shadow hover:shadow-lg"
			onClick={handleClick}
		>
			<CardHeader>
				<div className="flex items-start gap-4 w-full">
					<CardTitle>{ticket.title}</CardTitle>
					<TicketStatusBadge status={statusToLabel(ticket.status)} />
					<TicketPriorityBadge priority={ticket.priority} />
					<Badge variant="outline" className="text-xs">
						{TICKET_SETORES.find((s) => s.value === ticket.sector)?.label ?? ticket.sector}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription>{ticket.description}</CardDescription>
			</CardContent>
			<CardFooter>
				<div className="flex justify-between items-center gap-2 w-full border-t border-gray-200">
					<div className="flex gap-2 items-center w-full pt-2">
						<div className="flex gap-2 items-center mr-2">
							<CalendarIcon className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">
								Criado em: {createdAtFormatted}
							</span>
						</div>
						<div className="flex gap-2 items-center">
							<MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">
								{commentsCount} comentário{commentsCount !== 1 ? 's' : ''}
							</span>
						</div>
					</div>
					<div className="flex gap-2 items-center whitespace-nowrap">
						<span className="text-sm text-muted-foreground">
							Por: {ticket.user.name}
						</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
