'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ClockIcon, CheckIcon, Loader2Icon, ChartBarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_ICONS: Record<string, React.ReactNode> = {
	Total: <ChartBarIcon className="w-4 h-4 text-gray-500" />,
	'Em aberto': <ClockIcon className="w-4 h-4 text-blue-500" />,
	'Em andamento': <Loader2Icon className="w-4 h-4 text-yellow-500" />,
	'Aguardando sua resposta': <ClockIcon className="w-4 h-4 text-orange-500" />,
	Finalizado: <CheckIcon className="w-4 h-4 text-green-500" />
}

export interface StatusCardProps {
	label: string
	value: number
	color: string
	isSelected: boolean
	href: string
}

export function StatusCard({ label, value, color, isSelected, href }: StatusCardProps) {
	const icon = STATUS_ICONS[label] ?? <ChartBarIcon className="w-4 h-4 text-gray-500" />
	return (
		<Link href={href}>
			<Card
				className={cn(
					'w-full cursor-pointer transition-shadow hover:shadow-lg',
					isSelected && 'ring-2 ring-primary shadow-md'
				)}
			>
				<CardContent>
					<div className="flex items-center gap-4">
						<div
							className={cn(
								'w-8 h-8 rounded-xl flex items-center justify-center',
								color
							)}
						>
							{icon}
						</div>
						<div className="flex flex-col justify-between">
							<p className="text-lg font-bold">{value}</p>
							<h2 className="text-sm text-muted-foreground">{label}</h2>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
