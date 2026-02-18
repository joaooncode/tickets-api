// tickets

import { Comment, User, TicketStatus } from "@/prisma/generated/prisma/client";

export type CommentWithUser = Comment & { user: User };

export type TicketWithRelations = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    user: User;
    assignedTo: User | null;
    comments: CommentWithUser[];
    createdAt: Date;
    updatedAt: Date;
}

export enum Priority {
    NORMAL = "Normal",
    URGENT = "Urgente"
}


// comments

