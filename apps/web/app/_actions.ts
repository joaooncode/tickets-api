"use server"

import { CreateTicketData } from "@/lib/schemas"
import type { CreateTicketError } from "@/lib/errors"
import { ticketService } from "@/services/ticket.service"

export async function createTicket(ticket: CreateTicketData): Promise<{ success: boolean, error: CreateTicketError | null }> {
    try {
        const res = await ticketService.createTicket(ticket)

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