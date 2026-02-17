// tickets

import { Comment, User, TicketStatus } from "@/prisma/generated/prisma/client";

export type TicketWithRelations = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    user: User;
    assignedTo: User | null;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}

export enum Priority {
    NORMAL = "Normal",
    URGENT = "Urgente"
}


// comments

