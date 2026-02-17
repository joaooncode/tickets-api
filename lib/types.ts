// tickets

export type Ticket = {
    id: string;
    title: string;
    description: string;
    user_id: string;
    assigned_to: string | null;
    status: string;
    priority: string;
    created_at: number;
};

export enum Priority {
    NORMAL = "Normal",
    URGENT = "Urgente"
}

export enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    WAITING_FOR_CUSTOMER = "waiting_for_customer",
    RESOLVED = "resolved"
}

// comments

export type Comment = {
    id: string;
    body: string;
    user_id: string;
    ticket_id: string;
    created_at: number;
};

