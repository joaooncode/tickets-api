'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Dot, UserIcon } from 'lucide-react'
import { Badge } from './ui/badge'

const STATUS_CONFIG = {
    completed: {
        chip: 'bg-teal-500 text-white',
        marker: 'bg-teal-500',
        label: 'Concluído',
    },
    'in-progress': {
        chip: 'bg-amber-500 text-white',
        marker: 'bg-amber-500',
        label: 'Em progresso',
    },
    pending: {
        chip: 'bg-blue-500 text-white',
        marker: 'bg-blue-500',
        label: 'Pendente',
    },
} as const

export type TimelineItemStatus = keyof typeof STATUS_CONFIG

export interface TimelineItemProps {
    date: Date
    title: string
    description: string
    icon?: React.ReactNode
    status: TimelineItemStatus
    assignedTo?: string
}

function formatTimelineDate(date: Date) {
    const day = date.getUTCDate()
    const month = date.toLocaleDateString('pt-BR', {
        month: 'short',
        timeZone: 'UTC',
    })

    return { day, month }
}

export function Timeline({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex flex-col [.timeline-item:last-child_.timeline-segment]:hidden"
            role="list"
            aria-label="Linha do tempo"
        >
            {children}
        </div>
    )
}

export function TimelineItem({
    date,
    title,
    description,
    icon,
    status,
    assignedTo,
}: TimelineItemProps) {
    const { day, month } = formatTimelineDate(date)
    const config = STATUS_CONFIG[status]

    return (
        <article
            className="timeline-item relative flex gap-4 pb-6 last:pb-0 max-w-sm"
            role="listitem"
        >
            {/* Coluna da data */}
            <div className="flex shrink-0 flex-col items-end justify-center pr-2 text-right">
                <span className="block text-lg font-medium leading-tight text-gray-700">
                    {day}
                </span>
                <span className="block text-xs uppercase leading-tight text-gray-500">
                    {month}
                </span>
            </div>

            {/* Coluna do eixo + marcador */}
            <div className="relative flex shrink-0 flex-col items-center">
                <div
                    className={cn(
                        'z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        config.marker,
                    )}
                    aria-hidden>
                    <span className="flex text-white [&>svg]:size-11">
                        <Dot />
                    </span>
                </div>
                {/* Segmento da linha (oculto no último item via Timeline) */}
                <div
                    // className="timeline-segment absolute top-6 left-1/2 bottom-0 h-[calc(100%-1rem)] w-0.5 -translate-x-1/2 bg-gray-200"
                    className="timeline-segment absolute top-4 left-1/2 bottom-0 h-35 w-0.5 -translate-x-1/2 bg-gray-200"
                    aria-hidden
                />
            </div>

            {/* Card */}
            <div className="min-w-0 flex-1 rounded-sm min-h-30 border border-gray-100 bg-white p-4 shadow-sm">
                <span
                    className={cn(
                        'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                        config.chip,
                    )}
                >
                    {config.label}
                </span>
                <h3 className="mt-2 font-semibold text-gray-900">{title}</h3>
                {assignedTo && (
                    <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm text-gray-500">{assignedTo}</p>
                        </div>
                        <Badge className="bg-white border border-gray-300 text-muted-foreground min-w-10">
                            TI
                        </Badge>
                    </div>
                )}
            </div>
        </article>
    )
}
