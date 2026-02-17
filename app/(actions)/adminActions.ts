"use server"

import { ActionResult, isCurrentUserAdmin } from "@/lib/utils"
import { TicketStatus, User, UserRole } from "@/prisma/generated/prisma/client"
import { userService } from "@/services/user.service"
import { ticketService } from "@/services/ticket.service"
import type { TicketWithRelations } from "@/lib/types"



// ==================
// USERS
// ==================

/**
 * Fetches all users from the database (REQUIRE ADMIN ROLE)
 * @param isActive? - Whether the users should be active
 * @param userRole? - The role of the users to fetch
 * @returns a Result<User[], USER_ERRORS>
 */
export async function getAllUsers(isActive?: boolean, userRole?: UserRole): Promise<ActionResult<User[]>> {
    try {
        const isAdmin = await isCurrentUserAdmin()
        if (!isAdmin) {
            return { success: false, data: null, error: "Você não tem permissão para esta ação." }
        }

        const res = await userService.getAllUsers(userRole, isActive)
        if (res.isErr()) {
            if (res.error.type === "NOT_FOUND") {
                return { success: false, data: null, error: "Usuários não encontrados." }
            }
            if (res.error.type === "FETCH_ERROR") {
                return { success: false, data: null, error: "Erro ao buscar usuários." }
            }
            if (res.error.type === "UNKNOWN_ERROR") {
                return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
            }
            return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
        }

        return { success: true, data: res.value, error: null }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "Algo deu errado. Tente novamente em instantes.",
        }
    }
}


/**
 * Gets a user by their internal ID (REQUIRE ADMIN ROLE)
 * @param userId - The user's internal ID
 * @returns a Result<User, USER_ERRORS>
 */
export async function getUserById(userId: string): Promise<ActionResult<User>> {
    try {
        const isAdmin = await isCurrentUserAdmin()
        if (!isAdmin) {
            return { success: false, data: null, error: "Você não tem permissão para esta ação." }
        }

        const res = await userService.getUserById(userId)
        if (res.isErr()) {
            if (res.error.type === "NOT_FOUND") {
                return { success: false, data: null, error: "Usuário não encontrado." }
            }
            if (res.error.type === "FETCH_ERROR") {
                return { success: false, data: null, error: "Erro ao buscar usuário." }
            }
            if (res.error.type === "UNKNOWN_ERROR") {
                return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
            }
            return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
        }

        return { success: true, data: res.value, error: null }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "Algo deu errado. Tente novamente em instantes.",
        }
    }
}

/**
 * Fetches all tickets from the database (REQUIRE ADMIN ROLE)
 * @returns a Result<TicketWithRelations[], TICKET_ERRORS>
 */
export async function getAllTickets(status?: TicketStatus): Promise<
    ActionResult<TicketWithRelations[]>
> {
    try {
        const isAdmin = await isCurrentUserAdmin()
        if (!isAdmin) {
            return { success: false, data: null, error: "Você não tem permissão para esta ação." }
        }

        const tickets = await ticketService.getAllTickets()
        if (tickets.isErr()) {
            if (tickets.error.type === "NOT_FOUND") {
                return { success: false, data: null, error: "Tickets não encontrados." }
            }
            if (tickets.error.type === "FETCH_ERROR") {
                return { success: false, data: null, error: "Erro ao buscar tickets." }
            }
            if (tickets.error.type === "UNKNOWN_ERROR") {
                return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
            }
            return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
        }

        console.log("[getAllTickets] Sucesso", tickets.value.length, "tickets")
        return { success: true, data: tickets.value, error: null }
    } catch (e) {
        console.error("[getAllTickets] Exceção", e)
        return {
            success: false,
            data: null,
            error: "Algo deu errado. Tente novamente em instantes.",
        }
    }
}

// ==================
// TICKETS
// ==================

// getTicketById
export async function getTicketById(ticketId: string): Promise<ActionResult<TicketWithRelations>> {
    try {
        const isAdmin = await isCurrentUserAdmin()

        if (!isAdmin) {
            return { success: false, data: null, error: "Você não tem permissão para esta ação." }
        }

        const res = await ticketService.getTicketById(ticketId)

        if (res.isErr()) {
            if (res.error.type === "NOT_FOUND") {
                return { success: false, data: null, error: "Ticket não encontrado." }
            }
            if (res.error.type === "FETCH_ERROR") {
                return { success: false, data: null, error: "Erro ao buscar ticket." }
            }
            if (res.error.type === "UNKNOWN_ERROR") {
                return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
            }
            return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
        }

        return { success: true, data: res.value, error: null }
    } catch (e) {
        return {
            success: false,
            data: null,
            error: "Algo deu errado. Tente novamente em instantes.",
        }
    }
}

// updateTicketStatus
export async function updateTicketStatus(ticketId: string, status: TicketStatus): Promise<ActionResult<null>> {
    try {
        const isAdmin = await isCurrentUserAdmin()

        if (!isAdmin) {
            return { success: false, data: null, error: "Você não tem permissão para esta ação." }
        }

        const res = await ticketService.updateTicketStatus(ticketId, status)

        if (res.isErr()) {
            if (res.error.type === "NOT_FOUND") {
                return { success: false, data: null, error: "Ticket não encontrado." }
            }
            if (res.error.type === "UPDATE_ERROR") {
                return { success: false, data: null, error: "Erro ao atualizar o status do ticket." }
            }
            if (res.error.type === "UNKNOWN_ERROR") {
                return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
            }
            return { success: false, data: null, error: "Algo deu errado. Tente novamente em instantes." }
        }

        return { success: true, data: null, error: null }
    } catch (e) {
        return {
            success: false,
            data: null,
            error: "Algo deu errado. Tente novamente em instantes.",
        }
    }
}




