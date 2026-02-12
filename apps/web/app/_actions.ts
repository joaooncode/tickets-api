"use server"

import { CreateTicketData } from "@/lib/schemas";
import { cookies } from "next/headers";
import { CreateTicketActionResult } from "../lib/types";

/** Creates a new ticket via API. Returns a serializable result for the client. */
export async function createNewTicket(
    data: CreateTicketData
): Promise<CreateTicketActionResult> {
    try {
        const token = (await cookies()).get("token")?.value;

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        console.log("Resultado post new ticket to api:", result.status, result.statusText);

        if (!result.ok) {
            console.error("Failed to create ticket:", result.status, result.statusText);
            return {
                success: false,
                error: {
                    type: "UNKNOWN_ERROR",
                    message: "Falha ao criar ticket",
                },
            };
        }

        console.log("Ticket created successfully");

        return {
            success: true,
            message: "Ticket criado com sucesso",
        };
    } catch (error) {
        console.error("(catch) Error creating new ticket:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        return {
            success: false,
            error: {
                type: "UNKNOWN_ERROR",
                message,
            },
        };
    }
}
