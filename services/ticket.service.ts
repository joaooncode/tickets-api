import { ok, err, type Result } from 'neverthrow'
import { prisma } from '@/lib/prisma'
import { TicketPriority, TicketStatus } from '@/prisma/generated/prisma/client'
import type {
	GET_ALL_TICKETS_ERROR,
	GET_TICKET_BY_ID_ERROR,
	GET_CREATED_TICKETS_BY_USER_ID_ERROR,
	CREATE_TICKET_ERROR,
	UPDATE_TICKET_STATUS_ERROR,
	CREATE_COMMENT_ERROR,
} from '@/lib/errors'
import type { CreateTicketServiceInput } from '@/lib/schemas'
import type { TicketWithRelations } from '@/lib/types'

export const ticketService = {
	/**
	 * Fetches all tickets from the database (REQUIRE ADMIN ROLE)
	 * @returns a Result<TicketWithRelations[], GetAllTicketsError>
	 */
	async getAllTickets(
		status?: TicketStatus,
		priority?: TicketPriority
	): Promise<Result<TicketWithRelations[], GET_ALL_TICKETS_ERROR>> {
		try {
			const tickets = await prisma.ticket.findMany({
				where: { status, priority },
				include: {
					user: true,
					assignedTo: true,
					comments: { include: { user: true } },
				},
			})

			if (!tickets) {
				return err({ type: 'NOT_FOUND', message: 'Tickets not found' })
			}

			return ok(tickets)

		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'FETCH_ERROR', message })
		}
	},
	/**
	 * Fetches a ticket by its ID
	 * REQUIRE ADMIN ROLE OR THE USER ITSELF
	 * @param ticketId - The ticket's ID
	 * @returns a Result<TicketWithRelations, GetTicketByIdError>
	 */
	async getTicketById(
		ticketId: string,
	): Promise<Result<TicketWithRelations, GET_TICKET_BY_ID_ERROR>> {
		try {
			const ticket = await prisma.ticket.findUnique({
				where: { id: ticketId },
				include: {
					user: true,
					assignedTo: true,
					comments: { include: { user: true } },
				},
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

	/**
	 * Fetches all tickets created by a user
	 * @param userId - The user's internal ID
	 * @returns a Result<TicketWithRelations[], GetCreatedTicketsByUserIdError>
	 */
	async getUserTickets(
		userId: string,
		status?: TicketStatus,
	): Promise<Result<TicketWithRelations[], GET_CREATED_TICKETS_BY_USER_ID_ERROR>> {
		try {
			const userTickets = await prisma.ticket.findMany({
				where: { userId, status },
				include: {
					user: true,
					assignedTo: true,
					comments: { include: { user: true } },
				},
			})

			if (!userTickets) {
				return err({ type: 'USER_NOT_FOUND', message: 'User not found' })
			}

			return ok(userTickets)
		} catch (e) {
			console.log("[getCreatedTicketsByUserId] Exceção", e)
			return err({ type: 'FETCH_ERROR', message: "Erro ao buscar tickets criados pelo usuário" })
		}
	},

	/**
	 * Creates a new ticket
	 * @param userId - The user's internal ID
	 * @param data - CreateTicketServiceInput (attachments como paths)
	 * @returns a Result<Ticket, CreateTicketError>
	 */
	async createTicket(
		userId: string,
		data: CreateTicketServiceInput,
	): Promise<Result<string, CREATE_TICKET_ERROR>> {
		try {
			const ticket = await prisma.ticket.create({
				data: { userId, ...data },
			})

			if (!ticket) {
				return err({ type: 'CREATE_ERROR', message: 'Erro ao criar ticket' })
			}

			return ok(ticket.id)
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			return err({ type: 'UNKNOWN_ERROR', message })
		}
	},

	/**
	 * Updates the status of a ticket (REQUIRE ADMIN ROLE)
	 * @param ticketId - The ticket's ID
	 * @param status - The new status
	 * @returns a Result<true, UPDATE_TICKET_STATUS_ERROR>
	 */
	async updateTicketStatus(
		ticketId: string,
		status: TicketStatus,
	): Promise<Result<true, UPDATE_TICKET_STATUS_ERROR>> {
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

			if (!updated) {
				return err({ type: 'UPDATE_ERROR', message: 'Failed to update ticket status' })
			}

			return ok(true)
		} catch (e) {
			console.log("[updateTicketStatus] Exceção", e)
			return err({ type: 'UNKNOWN_ERROR', message: "Erro ao atualizar o status do ticket" })
		}
	},

	/**
	 * Creates a new comment
	 * @param ticketId - The ticket's ID
	 * @param userId - The user's internal ID
	 * @param content - The comment's content
	 * @returns a Result<true, CREATE_COMMENT_ERROR>
	 */
	async createComment(
		ticketId: string,
		userId: string,
		content: string,
	): Promise<Result<true, CREATE_COMMENT_ERROR>> {
		try {
			const comment = await prisma.comment.create({
				data: { ticketId, userId, content },
			})

			if (!comment) {
				return err({ type: 'CREATE_ERROR', message: 'Failed to create comment' })
			}

			return ok(true)
		} catch (e) {
			console.log("[createComment] Exceção", e)
			return err({ type: 'UNKNOWN_ERROR', message: "Erro ao criar o comentário" })
		}
	},
}
