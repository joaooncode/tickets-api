'use client'

import type { TicketPriority, TicketStatus } from '@/prisma/generated/prisma/browser'
import type { TicketWithRelations } from '@/lib/types'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ChartBarIcon, Loader2Icon, CheckIcon, ClockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminTicketsFilterProps {
	tickets: TicketWithRelations[]
	selectedStatus: TicketStatus | null
	onStatusSelect: (status: TicketStatus | null) => void
	selectedPriority: TicketPriority | null
	onPrioritySelect: (priority: TicketPriority | null) => void
}

const PRIORITY_ALL_VALUE = 'all'

export default function AdminTicketsFilter({
	tickets,
	selectedStatus,
	onStatusSelect,
	selectedPriority,
	onPrioritySelect,
}: AdminTicketsFilterProps) {
	const totalTickets = tickets.length
	const openTickets = tickets.filter((t) => t.status === 'OPEN').length
	const inProgressTickets = tickets.filter(
		(t) => t.status === 'IN_PROGRESS',
	).length
	const closedTickets = tickets.filter((t) => t.status === 'CLOSED').length

	const cards = [
		{
			label: 'Total',
			count: totalTickets,
			status: null as TicketStatus | null,
			icon: <ChartBarIcon className="w-4 h-4 text-muted-foreground" />
		},
		{
			label: 'Em aberto',
			count: openTickets,
			status: 'OPEN' as const,
			icon: <ClockIcon className="w-4 h-4 text-blue-500" />
		},
		{
			label: 'Em andamento',
			count: inProgressTickets,
			status: 'IN_PROGRESS' as const,
			icon: <Loader2Icon className="w-4 h-4 text-yellow-500" />
		},
		{
			label: 'Finalizados',
			count: closedTickets,
			status: 'CLOSED' as const,
			icon: <CheckIcon className="w-4 h-4 text-green-500" />
		},
	]

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="grid grid-cols-4 gap-4 w-full">
				{cards.map(({ label, count, status, icon }) => {
					const isSelected = selectedStatus === status
					return (
						<Card
							key={label}
							className={cn(
								'col-span-1 cursor-pointer transition-colors hover:bg-muted/50',
								isSelected && 'ring-2 ring-primary bg-muted',
							)}
							onClick={() => onStatusSelect(status)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									onStatusSelect(status)
								}
							}}
						>
							<CardHeader>
								<CardTitle className="flex flex-row gap-4 items-center">
									<div>
										{icon}
									</div>
									<div className="flex flex-col gap-2 items-start justify-center">
										<span>{label}</span>
										<span>{count}</span>
									</div>
								</CardTitle>
							</CardHeader>
						</Card>
					)
				})}
			</div>
			<div className="flex flex-col gap-2 w-fit">
				<label htmlFor="priority-select" className="text-sm font-medium">
					Prioridade
				</label>
				<Select
					value={selectedPriority ?? PRIORITY_ALL_VALUE}
					onValueChange={(value) =>
						onPrioritySelect(
							value === PRIORITY_ALL_VALUE ? null : (value as TicketPriority),
						)
					}
				>
					<SelectTrigger id="priority-select" className="w-[10rem]">
						<SelectValue placeholder="Todos" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={PRIORITY_ALL_VALUE}>Todos</SelectItem>
						<SelectItem value="NORMAL">Normal</SelectItem>
						<SelectItem value="URGENT">Urgente</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}