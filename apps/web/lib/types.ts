import { z } from "zod";

export type CreateTicketError = {
    type: "VALIDATION_ERROR";
    error: z.ZodError;
} | {
    type: "UNKNOWN_ERROR";
    error: Error;
}

export enum Priority {
    NORMAL = "Normal",
    URGENT = "Urgente"
}

/** Serializable result of createNewTicket (for Server Action return) */
export type CreateTicketActionResult =
    | { success: true; message: string }
    | { success: false; error: { type: string; message: string } }