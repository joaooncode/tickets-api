import { getAuthHeaders } from "@/lib/api";
import { Ticket, TicketStatus } from "@/lib/types";
import type { CreateCommentError, CreateTicketError, FetchError, UpdateTicketStatusError } from "@/lib/errors";
import { ok, err, Result } from "neverthrow";
import { CreateTicketData } from "@/lib/schemas";


export const ticketService = {
    async getAllTickets(): Promise<Result<Ticket[], FetchError>> {
        try {
            const headers = await getAuthHeaders()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`,
                {
                    headers,
                }
            )

            if (res.status === 404) {
                return err({ type: 'NOT_FOUND', message: 'No tickets found' });
            }

            if (!res.ok) {
                return err({ type: 'FETCH_ERROR', message: 'Failed to fetch tickets' });
            }

            const data: Ticket[] = await res.json();
            console.log("(old-ticket.service.getAllTickets) Tickets", data)
            return ok(data);
        } catch (error) {
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while fetching tickets' });
        }
    },
    async getUserTickets(userId: string): Promise<Result<Ticket[], FetchError>> {
        try {
            const headers = await getAuthHeaders()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/tickets`,
                {
                    headers,
                }
            )

            return ok([]);
        } catch (error) {
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while fetching the user tickets' });
        }
    },
    async getAllTicketsStatuses(): Promise<Result<TicketStatus[], FetchError>> {
        try {
            return ok([]);
        } catch (error) {
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while fetching the ticket statuses' });
        }
    },
    async createTicket(ticket: CreateTicketData): Promise<Result<true, CreateTicketError>> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
                method: "POST",
                headers: {
                    ...(await getAuthHeaders()),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticket),
            })
            if (!res.ok) {
                console.error("(old-ticket.service.createTicket) Failed to create ticket", res.json())
                return err({ type: 'UNKNOWN_ERROR', message: 'Failed to create ticket' });
            }
            return ok(true);
        } catch (error) {
            console.error("(old-ticket.service.createTicket) An unknown error occurred while creating the ticket", error)
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while creating the ticket' });
        }
    },
    async updateTicketStatus(ticketId: string, status: TicketStatus): Promise<Result<true, UpdateTicketStatusError>> {
        try {
            return ok(true);
        } catch (error) {
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while updating the ticket status' });
        }
    },
    async createComment(ticketId: string, comment: string): Promise<Result<true, CreateCommentError>> {
        try {
            const headers = await getAuthHeaders()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}/comments`,
                {
                    headers,
                    method: "POST",
                    body: JSON.stringify({ comment }),
                }
            )

            return ok(true);
        } catch (error) {
            return err({ type: 'UNKNOWN_ERROR', message: 'An unknown error occurred while creating the comment' });
        }
    }
}