import { ok, err, type Result } from 'neverthrow'
import { prisma } from '@/lib/prisma'
import type { Ticket, Comment } from '@/prisma/generated/prisma/client'
import { TicketStatus } from '@/prisma/generated/prisma/client'
import type { Prisma } from '@/prisma/generated/prisma/client'
import type {
	GetAllTicketsError,
	GetTicketByIdError,
	GetAssignedTicketsByUserIdError,
	GetCreatedTicketsByUserIdError,
	CreateTicketError,
	UpdateTicketStatusError,
	CreateCommentError,
} from '@/lib/errors'

const ticketInclude = {
	user: true,
	assignedTo: true,
	comments: { include: { user: true } },
} as const

type TicketWithRelations = Prisma.TicketGetPayload<{
	include: typeof ticketInclude
}>

const VALID_STATUSES: string[] = Object.values(TicketStatus)

function isTicketStatus(value: string): value is TicketStatus {
	return VALID_STATUSES.includes(value)
}

export const ticketService = {
	async getAllTickets(): Promise<
		Result<TicketWithRelations[], GetAllTicketsError>
	> {
		try {
			const tickets = await prisma.ticket.findMany({
				include: ticketInclude,
			})
			return ok(tickets)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'FETCH_ERROR', message })
		}
	},

	async getTicketById(
		ticketId: string,
	): Promise<Result<TicketWithRelations, GetTicketByIdError>> {
		try {
			const ticket = await prisma.ticket.findUnique({
				where: { id: ticketId },
				include: ticketInclude,
			})
			if (!ticket) {
				return err({ type: 'NOT_FOUND', message: 'Ticket not found' })
			}
			return ok(ticket)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'FETCH_ERROR', message })
		}
	},

	async getAssignedTicketsByUserId(
		userId: string,
	): Promise<
		Result<TicketWithRelations[], GetAssignedTicketsByUserIdError>
	> {
		try {
			const user = await prisma.user.findUnique({
				where: { id: userId },
			})
			if (!user) {
				return err({ type: 'USER_NOT_FOUND', message: 'User not found' })
			}
			const tickets = await prisma.ticket.findMany({
				where: { assignedToId: userId },
				include: ticketInclude,
			})
			return ok(tickets)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'FETCH_ERROR', message })
		}
	},

	async getCreatedTicketsByUserId(
		userId: string,
	): Promise<
		Result<TicketWithRelations[], GetCreatedTicketsByUserIdError>
	> {
		try {
			const user = await prisma.user.findUnique({
				where: { id: userId },
			})
			if (!user) {
				return err({ type: 'USER_NOT_FOUND', message: 'User not found' })
			}
			const tickets = await prisma.ticket.findMany({
				where: { userId },
				include: ticketInclude,
			})
			return ok(tickets)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'FETCH_ERROR', message })
		}
	},

	async createTicket(
		userId: string,
		title: string,
		description: string,
	): Promise<Result<Ticket, CreateTicketError>> {
		try {
			const ticket = await prisma.ticket.create({
				data: { userId, title, description },
			})
			return ok(ticket)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'UNKNOWN_ERROR', message })
		}
	},

	async updateTicketStatus(
		ticketId: string,
		status: string,
	): Promise<Result<Ticket, UpdateTicketStatusError>> {
		if (!isTicketStatus(status)) {
			return err({
				type: 'INVALID_STATUS',
				message: `Invalid status: ${status}`,
			})
		}
		try {
			const ticket = await prisma.ticket.findUnique({
				where: { id: ticketId },
			})
			if (!ticket) {
				return err({ type: 'NOT_FOUND', message: 'Ticket not found' })
			}
			const updated = await prisma.ticket.update({
				where: { id: ticketId },
				data: { status },
			})
			return ok(updated)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'UNKNOWN_ERROR', message })
		}
	},

	async createComment(
		ticketId: string,
		userId: string,
		content: string,
	): Promise<Result<Comment, CreateCommentError>> {
		try {
			const [ticket, user] = await Promise.all([
				prisma.ticket.findUnique({ where: { id: ticketId } }),
				prisma.user.findUnique({ where: { id: userId } }),
			])
			if (!ticket) {
				return err({
					type: 'TICKET_NOT_FOUND',
					message: 'Ticket not found',
				})
			}
			if (!user) {
				return err({ type: 'USER_NOT_FOUND', message: 'User not found' })
			}
			const comment = await prisma.comment.create({
				data: { ticketId, userId, content },
			})
			return ok(comment)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'UNKNOWN_ERROR', message })
		}
	},
}
