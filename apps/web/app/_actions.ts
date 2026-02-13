"use server"

import { CreateTicketData } from "@/lib/schemas"
import type { CreateTicketError, FetchError } from "@/lib/errors"
import { ticketService } from "@/services/ticket.service"
import { auth } from "@clerk/nextjs/server"
import { Result, ok, err } from "neverthrow"
import { Ticket } from "@/prisma/generated/prisma/client"

export async function createTicket(ticket: CreateTicketData): Promise<{ success: boolean, error: CreateTicketError | null }> {
    try {
        const { userId } = await auth()
        if (!userId) {
            return {
                success: false,
                error: {
                    type: "UNAUTHORIZED",
                    message: "Unauthorized"
                }
            }
        }
        const res = await ticketService.createTicket(ticket, userId)

        if (res.isErr()) {
            return {
                success: false,
                error: {
                    type: "UNKNOWN_ERROR",
                    message: "An unknown error occurred while creating the ticket"
                }
            }
        }
        return {
            success: true,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            error: {
                type: "UNKNOWN_ERROR",
                message: "An unknown error occurred while creating the ticket"
            }
        }
    }
}

type TicketError = {
    type: "UNKNOWN_ERROR";
    message: string;
} | {
    type: "NOT_FOUND";
    message: string;
}

// admin only
export async function getAllTickets(): Promise<Result<Ticket[], TicketError>> {
    try {
        const { userId } = await auth()
        if (!userId) {
            return err({ type: "UNAUTHORIZED", message: "Unauthorized" })
        }
        if (userId !== "admin") {
            return err({ type: "UNAUTHORIZED", message: "Unauthorized" })
        }
        const res = await ticketService.getAllTickets()
        if (res.isErr()) {
            return err({ type: "UNKNOWN_ERROR", message: "An unknown error occurred while fetching the tickets" })
        }
        return ok(res.value)
    } catch (error) {
        return err({ type: "UNKNOWN_ERROR", message: "An unknown error occurred while fetching the tickets" })
    }
}