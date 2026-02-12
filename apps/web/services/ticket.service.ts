import { ok, err, Result } from "neverthrow";

// buscar endpoint na api

type Ticket = {
    id: string;
    title: string;
    description: string;
    user_id: string;
    assigned_to: string | null;
    status: string;
    priority: string;
    created_at: number;
};

type FetchError = {
    type: 'NOT_FOUND';
    message: string;
} | {
    type: 'FETCH_ERROR';
    message: string;
} | {
    type: 'UNKNOWN_ERROR';
    message: string;
}

export async function getTickets(): Promise<Result<Ticket[], FetchError>> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`);

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
}