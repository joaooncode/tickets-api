'use client'

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(ArcElement, Tooltip, Legend)

const CATEGORY_COLORS = [
	'rgb(34, 86, 197)',
	'rgb(234, 179, 8)',
	'rgb(29, 199, 29)',
	'rgb(168, 85, 247)',
	'rgb(236, 72, 153)',
	'rgb(14, 165, 233)',
	'rgb(249, 115, 22)',
	'rgb(107, 114, 128)',
]

interface TicketCategoryChartProps {
	tickets: Array<{ category: string }>
}

export default function TicketCategoryChart({ tickets }: TicketCategoryChartProps) {
	const countsByCategory = tickets.reduce<Record<string, number>>(
		(acc, t) => {
			const cat = t.category || 'Sem categoria'
			acc[cat] = (acc[cat] ?? 0) + 1
			return acc
		},
		{},
	)

	const labels = Object.keys(countsByCategory).sort()
	const dataValues = labels.map((label) => countsByCategory[label] ?? 0)
	const backgroundColors = labels.map(
		(_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length],
	)

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
					<CardTitle>Chamados por categoria</CardTitle>
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
				<CardTitle>Chamados por categoria</CardTitle>
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
