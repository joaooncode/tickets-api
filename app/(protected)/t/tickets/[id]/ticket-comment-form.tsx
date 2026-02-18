'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendIcon } from 'lucide-react'
import { createComment } from '@/app/(actions)/userActions'

const COMMENT_MAX_LENGTH = 1000

interface TicketCommentFormProps {
	ticketId: string
}

export function TicketCommentForm({ ticketId }: TicketCommentFormProps) {
	const router = useRouter()
	const [content, setContent] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isPending, setIsPending] = useState(false)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError(null)
		const trimmed = content.trim()
		if (!trimmed) {
			setError('Comentário não pode estar vazio.')
			return
		}
		if (trimmed.length > COMMENT_MAX_LENGTH) {
			setError(`Comentário deve ter no máximo ${COMMENT_MAX_LENGTH} caracteres.`)
			return
		}
		setIsPending(true)
		const result = await createComment(ticketId, trimmed)
		setIsPending(false)
		if (result.success) {
			setContent('')
			router.refresh()
		} else {
			setError(result.error)
		}
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
				<div>
					<Textarea
						placeholder="Escrever um comentário..."
						className="resize-none h-24"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						maxLength={COMMENT_MAX_LENGTH}
						disabled={isPending}
					/>
					<span className="text-sm text-muted-foreground pl-2">
						{content.length}/{COMMENT_MAX_LENGTH}
					</span>
				</div>
				{error && (
					<p className="text-sm text-destructive" role="alert">
						{error}
					</p>
				)}
				<div className="flex justify-end">
					<Button type="submit" size="lg" disabled={isPending}>
						<SendIcon className="w-4 h-4" />
						{isPending ? 'Enviando...' : 'Enviar'}
					</Button>
				</div>
			</form>
		</div>
	)
}
