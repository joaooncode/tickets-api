"use server"

import { auth } from "@clerk/nextjs/server"
import { UserRole } from "@/prisma/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { CreateTicketData } from "@/lib/schemas"
import { ticketService } from "@/services/ticket.service"
import { ActionResult } from "@/lib/utils"
import type { TicketWithRelations } from "@/lib/types"
import type { TicketStatus } from "@/prisma/generated/prisma/client"

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
	console.log("[getCurrentUserRole] User ID", userId)

	const user = await prisma.user.findUnique({
		where: { clerkUserId: userId },
		select: { role: true },
	})

	console.log("[getCurrentUserRole] User", user)

	return user?.role ?? null
}

export async function createTicket(
	data: CreateTicketData,
): Promise<ActionResult<string>> {
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
			data,
		)

		if (res.isErr()) {
			console.error("[createTicket] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: "Algo deu errado. Tente novamente em instantes.",
			}
		}

		console.log("[createTicket] Sucesso")

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

export async function getCurrentUserTicketById(
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
				error: "Algo deu errado. Tente novamente em instantes.",
			}
		}

		const ticket = res.value
		const isCreator = ticket.user.id === internalUserId
		const isAssigned = ticket.assignedTo?.id === internalUserId

		if (!isCreator && !isAssigned) {
			console.error("[getTicketById] Usuário sem permissão para este ticket")
			return {
				success: false,
				data: null,
				error: "Você não tem permissão para esta ação.",
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

export async function getCurrentUserTickets(
	status?: TicketStatus,
): Promise<
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

		const res = await ticketService.getUserTickets(internalUserId, status)

		if (res.isErr()) {
			console.error("[getCreatedTicketsByUserId] Erro do service", res.error)
			return {
				success: false,
				data: null,
				error: "Algo deu errado. Tente novamente em instantes.",
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

export async function createComment(
	ticketId: string,
	content: string,
): Promise<ActionResult<null>> {
	try {
		const trimmed = content.trim()

		if (trimmed.length < 1) {
			return {
				success: false,
				data: null,
				error: "Comentário não pode estar vazio.",
			}
		}

		if (trimmed.length > 1000) {
			return {
				success: false,
				data: null,
				error: `Comentário deve ter no máximo 1000 caracteres.`,
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
				error: "Algo deu errado. Tente novamente em instantes.",
			}
		}

		console.log("[createComment] Sucesso")

		return { success: true, data: null, error: null }
	} catch (e) {
		console.error("[createComment] Exceção", e)
		return {
			success: false,
			data: null,
			error: "Algo deu errado. Tente novamente em instantes.",
		}
	}
}
