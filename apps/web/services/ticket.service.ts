import { getAuthHeaders } from "@/lib/api";
import { Ticket, TicketStatus } from "@/lib/types";
import type { CreateCommentError, FetchError, UpdateTicketStatusError } from "@/lib/errors";
import { ok, err, Result } from "neverthrow";


export const ticketService = {
    async getAllTickets(): Promise<Result<Ticket[], FetchError>> {
        try {
            const headers = await getAuthHeaders()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
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