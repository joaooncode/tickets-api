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
import type { Ticket } from '@/lib/types'
import { TicketStatusBadge } from '@/components/status-badge'

function formatCreatedAt(createdAt: number): string {
	const date = new Date(createdAt)
	return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
	const router = useRouter()
	const createdAtFormatted = formatCreatedAt(ticket.created_at)
	const commentsCount = 0

	function handleClick() {
		router.push(`/t/tickets/${ticket.id}`)
	}

	return (
		<Card
			className="w-full cursor-pointer transition-shadow hover:shadow-lg"
			onClick={handleClick}
		>
			<CardHeader>
				<div className="flex justify-between items-start gap-2 w-full">
					<CardTitle>{ticket.title}</CardTitle>
					<TicketStatusBadge status={ticket.status} />
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
								{commentsCount}
							</span>
						</div>
					</div>
					<div className="flex gap-2 items-center whitespace-nowrap">
						<span className="text-sm text-muted-foreground">
							{ticket.user_id}
						</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
