// tickets

import { Comment, User, TicketStatus, TicketPriority } from "@/prisma/generated/prisma/browser";

export type CommentWithUser = Comment & { user: User };

export type TicketWithRelations = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: string;
    user: User;
    assignedTo: User | null;
    comments: CommentWithUser[];
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
}

// comments

