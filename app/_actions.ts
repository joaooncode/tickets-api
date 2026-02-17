"use server"

import { auth } from "@clerk/nextjs/server"
import type { Prisma } from "@/prisma/generated/prisma/client"
import type { Comment, Ticket } from "@/prisma/generated/prisma/client"
import { UserRole } from "@/prisma/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { CreateTicketData } from "@/lib/schemas"
import { ticketService } from "@/services/ticket.service"

export type ActionResult<T> =
	| { success: true; data: T; error: null }
	| { success: false; data: null; error: string }

const ticketInclude = {
	user: true,
	assignedTo: true,
	comments: { include: { user: true } },
} as const

type TicketWithRelations = Prisma.TicketGetPayload<{
	include: typeof ticketInclude
}>

type ServiceError =
	| { type: "NOT_FOUND"; message: string }
	| { type: "TICKET_NOT_FOUND"; message: string }
	| { type: "USER_NOT_FOUND"; message: string }
	| { type: "UNAUTHORIZED"; message: string }
	| { type: "INVALID_STATUS"; message: string }
	| { type: "FETCH_ERROR"; message: string }
	| { type: "UNKNOWN_ERROR"; message: string }

function toUserMessage(err: ServiceError): string {
	switch (err.type) {
		case "NOT_FOUND":
		case "TICKET_NOT_FOUND":
			return "Ticket não encontrado."
		case "USER_NOT_FOUND":
			return "Usuário não encontrado. Faça login novamente."
		case "UNAUTHORIZED":
			return "Você não tem permissão para esta ação."
		case "INVALID_STATUS":
			return "Status do ticket inválido."
		case "FETCH_ERROR":
		case "UNKNOWN_ERROR":
		default:
			return "Algo deu errado. Tente novamente em instantes."
	}
}

async function getInternalUserId(clerkUserId: string): Promise<string | null> {
	const user = await prisma.user.findUnique({
		where: { clerkUserId },
		select: { id: true },
	})
	return user?.id ?? null
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
	const { userId } = await auth()
	if (!userId) return null
	const user = await prisma.user.findUnique({
		where: { clerkUserId: userId },
		select: { role: true },
	})
	return user?.role ?? null
}

export async function createTicket(
	data: CreateTicketData,
): Promise<ActionResult<Ticket>> {
	try {
		const { userId } = await auth()
		if (!userId) {
			console.error("[createTicket] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const internalUserId = await getInternalUserId(userId)
		if (!internalUserId) {
			console.error("[createTicket] User não encontrado para clerkUserId", userId)
			return {
				success: false,
				data: null,
				error: "Usuário não encontrado. Faça login novamente.",
			}
		}
		const res = await ticketService.createTicket(
			internalUserId,
			data.title,
			data.description,
		)
		if (res.isErr()) {
			console.error("[createTicket] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log("[createTicket] Sucesso", res.value.id)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[createTicket] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

export async function getAllTickets(): Promise<
	ActionResult<TicketWithRelations[]>
> {
	try {
		const role = await getCurrentUserRole()
		if (role !== UserRole.ADMIN) {
			if (role === null) {
				console.error("[getAllTickets] Usuário não autenticado")
				return {
					success: false,
					data: null,
					error: "Você precisa estar logado para continuar.",
				}
			}
			console.error("[getAllTickets] Usuário sem permissão de admin")
			return {
				success: false,
				data: null,
				error: "Você não tem permissão para esta ação.",
			}
		}
		const res = await ticketService.getAllTickets()
		if (res.isErr()) {
			console.error("[getAllTickets] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log("[getAllTickets] Sucesso", res.value.length, "tickets")
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[getAllTickets] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

export async function getTicketById(
	ticketId: string,
): Promise<ActionResult<TicketWithRelations>> {
	try {
		const { userId } = await auth()
		if (!userId) {
			console.error("[getTicketById] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const internalUserId = await getInternalUserId(userId)
		if (!internalUserId) {
			console.error(
				"[getTicketById] User não encontrado para clerkUserId",
				userId,
			)
			return {
				success: false,
				data: null,
				error: "Usuário não encontrado. Faça login novamente.",
			}
		}
		const res = await ticketService.getTicketById(ticketId)
		if (res.isErr()) {
			console.error("[getTicketById] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		const ticket = res.value
		const isCreator = ticket.userId === internalUserId
		const isAssigned = ticket.assignedToId === internalUserId
		if (!isCreator && !isAssigned) {
			console.error("[getTicketById] Usuário sem permissão para este ticket")
			return {
				success: false,
				data: null,
				error: toUserMessage({ type: "UNAUTHORIZED", message: "" }),
			}
		}
		console.log("[getTicketById] Sucesso", res.value.id)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[getTicketById] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

export async function getAssignedTicketsByUserId(): Promise<
	ActionResult<TicketWithRelations[]>
> {
	try {
		const { userId } = await auth()
		if (!userId) {
			console.error("[getAssignedTicketsByUserId] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const internalUserId = await getInternalUserId(userId)
		if (!internalUserId) {
			console.error(
				"[getAssignedTicketsByUserId] User não encontrado para clerkUserId",
				userId,
			)
			return {
				success: false,
				data: null,
				error: "Usuário não encontrado. Faça login novamente.",
			}
		}
		const res =
			await ticketService.getAssignedTicketsByUserId(internalUserId)
		if (res.isErr()) {
			console.error("[getAssignedTicketsByUserId] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log(
			"[getAssignedTicketsByUserId] Sucesso",
			res.value.length,
			"tickets",
		)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[getAssignedTicketsByUserId] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

export async function getCreatedTicketsByUserId(): Promise<
	ActionResult<TicketWithRelations[]>
> {
	try {
		const { userId } = await auth()
		if (!userId) {
			console.error("[getCreatedTicketsByUserId] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const internalUserId = await getInternalUserId(userId)
		if (!internalUserId) {
			console.error(
				"[getCreatedTicketsByUserId] User não encontrado para clerkUserId",
				userId,
			)
			return {
				success: false,
				data: null,
				error: "Usuário não encontrado. Faça login novamente.",
			}
		}
		const res =
			await ticketService.getCreatedTicketsByUserId(internalUserId)
		if (res.isErr()) {
			console.error("[getCreatedTicketsByUserId] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log(
			"[getCreatedTicketsByUserId] Sucesso",
			res.value.length,
			"tickets",
		)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[getCreatedTicketsByUserId] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

export async function updateTicketStatus(
	ticketId: string,
	status: string,
): Promise<ActionResult<Ticket>> {
	try {
		const { userId } = await auth()
		if (!userId) {
			console.error("[updateTicketStatus] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const res = await ticketService.updateTicketStatus(ticketId, status)
		if (res.isErr()) {
			console.error("[updateTicketStatus] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log("[updateTicketStatus] Sucesso", res.value.id)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[updateTicketStatus] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}

const COMMENT_CONTENT_MIN = 1
const COMMENT_CONTENT_MAX = 1000

export async function createComment(
	ticketId: string,
	content: string,
): Promise<ActionResult<Comment>> {
	try {
		const trimmed = content.trim()
		if (trimmed.length < COMMENT_CONTENT_MIN) {
			return {
				success: false,
				data: null,
				error: "Comentário não pode estar vazio.",
			}
		}
		if (trimmed.length > COMMENT_CONTENT_MAX) {
			return {
				success: false,
				data: null,
				error: `Comentário deve ter no máximo ${COMMENT_CONTENT_MAX} caracteres.`,
			}
		}
		const { userId } = await auth()
		if (!userId) {
			console.error("[createComment] Usuário não autenticado")
			return {
				success: false,
				data: null,
				error: "Você precisa estar logado para continuar.",
			}
		}
		const internalUserId = await getInternalUserId(userId)
		if (!internalUserId) {
			console.error(
				"[createComment] User não encontrado para clerkUserId",
				userId,
			)
			return {
				success: false,
				data: null,
				error: "Usuário não encontrado. Faça login novamente.",
			}
		}
		const res = await ticketService.createComment(
			ticketId,
			internalUserId,
			trimmed,
		)
		if (res.isErr()) {
			console.error("[createComment] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: toUserMessage(res.error),
			}
		}
		console.log("[createComment] Sucesso", res.value.id)
		return { success: true, data: res.value, error: null }
	} catch (e) {
		console.error("[createComment] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}
