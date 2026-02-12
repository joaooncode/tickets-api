import { StatusCard } from '@/components/status-card'
import type { Ticket } from '@/lib/types'

const STATUS_LABELS = [
	{ label: 'Total', color: 'bg-gray-100' },
	{ label: 'Em aberto', color: 'bg-blue-100' },
	{ label: 'Em andamento', color: 'bg-yellow-100' },
	{ label: 'Aguardando sua resposta', color: 'bg-orange-100' },
	{ label: 'Finalizado', color: 'bg-green-100' }
] as const

export interface ListStatusProps {
	tickets: Ticket[]
	currentStatus: string | null
}

export function ListStatus({ tickets, currentStatus }: ListStatusProps) {
	const statusesWithCount = STATUS_LABELS.map((s) => ({
		...s,
		value:
			s.label === 'Total'
				? tickets.length
				: tickets.filter((t) => t.status === s.label).length
	}))

	return (
		<div className="grid grid-cols-4 gap-4 mt-4 w-full mb-8">
			{statusesWithCount.map((status) => {
				const isSelected =
					(status.label === 'Total' && currentStatus === null) ||
					currentStatus === status.label
				const href =
					status.label === 'Total'
						? '/t/dashboard'
						: `/t/dashboard?status=${encodeURIComponent(status.label)}`
				return (
					<StatusCard
						key={status.label}
						label={status.label}
						value={status.value}
						color={status.color}
						isSelected={isSelected}
						href={href}
					/>
				)
			})}
		</div>
	)
}
