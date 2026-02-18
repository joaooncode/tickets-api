'use client'

import type { TicketStatus } from '@/prisma/generated/prisma/client'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(ArcElement, Tooltip, Legend)

const STATUS_LABELS: Record<string, string> = {
    OPEN: 'Abertos',
    IN_PROGRESS: 'Em andamento',
    CLOSED: 'Finalizados',
}

const STATUS_ORDER = ['OPEN', 'IN_PROGRESS', 'CLOSED'] as const

const CHART_COLORS = {
    OPEN: 'rgb(147, 197, 253)',
    IN_PROGRESS: 'rgb(254, 240, 138)',
    CLOSED: 'rgb(134, 239, 172)',
}

interface TicketStatusChartProps {
    tickets: Array<{ status: TicketStatus }>
}

export default function TicketStatusChart({ tickets }: TicketStatusChartProps) {
    const counts = STATUS_ORDER.reduce(
        (acc, status) => {
            acc[status] = tickets.filter((t) => t.status === status).length
            return acc
        },
        {} as Record<string, number>,
    )

    const labels = STATUS_ORDER.map((s) => STATUS_LABELS[s] ?? s)
    const dataValues = STATUS_ORDER.map((s) => counts[s] ?? 0)
    const backgroundColors = STATUS_ORDER.map((s) => CHART_COLORS[s])

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
                    <CardTitle>Chamados por status</CardTitle>
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
                <CardTitle>Chamados por status</CardTitle>
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
