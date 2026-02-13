import { prisma } from '@/lib/prisma'
import { Prisma } from '@/prisma/generated/prisma/client'
import type { Ticket } from '@/prisma/generated/prisma/client'
import { TicketStatus } from '@/prisma/generated/prisma/client'
import type { PrismaError } from '@/lib/prisma-errors'
import { CreateTicketData } from '@/lib/schemas'
import { err, ok, Result } from 'neverthrow'

function getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback
}

export const ticketService = {
    async getAllTickets(): Promise<Result<Ticket[], PrismaError>> {
        try {
            const tickets = await prisma.ticket.findMany({
                orderBy: { createdAt: 'desc' },
            })
            return ok(tickets)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(error, 'Erro desconhecido ao acessar dados'),
            })
        }
    },

    async getUserTickets(userId: string): Promise<Result<Ticket[], PrismaError>> {
        try {
            const tickets = await prisma.ticket.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            })
            return ok(tickets)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(error, 'Erro desconhecido ao acessar dados'),
            })
        }
    },

    async getAllTicketsStatuses(): Promise<
        Result<TicketStatus[], PrismaError>
    > {
        try {
            const statuses = Object.values(TicketStatus) as TicketStatus[]
            return ok(statuses)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(error, 'Erro desconhecido ao acessar dados'),
            })
        }
    },

    async createTicket(
        data: CreateTicketData,
        clerkUserId: string,
    ): Promise<Result<true, PrismaError>> {
        try {
            const createData: Prisma.TicketUncheckedCreateInput = {
                userId: clerkUserId,
                title: data.title,
                description: data.description,
                status: TicketStatus.OPEN,
            }
            await prisma.ticket.create({ data: createData })
            return ok(true)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(error, 'Erro desconhecido ao criar ticket'),
            })
        }
    },

    async updateTicketStatus(
        ticketId: string,
        status: TicketStatus,
    ): Promise<Result<true, PrismaError>> {
        try {
            await prisma.ticket.update({
                where: { id: ticketId },
                data: { status },
            })
            return ok(true)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(
                    error,
                    'Erro desconhecido ao atualizar status do ticket',
                ),
            })
        }
    },

    /**
     * Cria um comentário no ticket. O caller deve passar o userId do usuário autenticado.
     */
    async createComment(
        ticketId: string,
        userId: string,
        content: string,
    ): Promise<Result<true, PrismaError>> {
        try {
            await prisma.comment.create({
                data: { ticketId, userId, content },
            })
            return ok(true)
        } catch (error) {
            return err({
                type: 'UNKNOWN',
                message: getErrorMessage(
                    error,
                    'Erro desconhecido ao criar comentário',
                ),
            })
        }
    },
}
