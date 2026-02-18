'use client'

import type { TicketPriority } from '@/prisma/generated/prisma/client'
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(ArcElement, Tooltip, Legend)

const PRIORITY_LABELS: Record<string, string> = {
	NORMAL: 'Normal',
	URGENT: 'Urgente',
}

const PRIORITY_ORDER = ['NORMAL', 'URGENT'] as const

const CHART_COLORS = {
	NORMAL: 'rgb(254, 215, 170)',
	URGENT: 'rgb(252, 165, 165)',
}

interface TicketPriorityChartProps {
	tickets: Array<{ priority: TicketPriority | null }>
}

export default function TicketPriorityChart({ tickets }: TicketPriorityChartProps) {
	const counts = PRIORITY_ORDER.reduce(
		(acc, priority) => {
			acc[priority] = tickets.filter(
				(t) => (t.priority ?? 'NORMAL') === priority,
			).length
			return acc
		},
		{} as Record<string, number>,
	)

	const labels = PRIORITY_ORDER.map((p) => PRIORITY_LABELS[p] ?? p)
	const dataValues = PRIORITY_ORDER.map((p) => counts[p] ?? 0)
	const backgroundColors = PRIORITY_ORDER.map((p) => CHART_COLORS[p])

	const chartData = {
		labels,
		datasets: [
			{
				data: dataValues,
				backgroundColor: backgroundColors,
				borderColor: backgroundColors,
				borderWidth: 1,
			},
		],
	}

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			tooltip: {
				callbacks: {
					label: (context: { label?: string; raw?: number }) => {
						const raw = Number(context.raw ?? 0)
						return `${context.label ?? ''}: ${raw}`
					},
				},
			},
		},
	}

	if (tickets.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Chamados por prioridade</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">Nenhum chamado encontrado.</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Chamados por prioridade</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mx-auto h-[280px] w-full max-w-sm">
					<Pie
						data={chartData}
						options={chartOptions as React.ComponentProps<typeof Pie>['options']}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
