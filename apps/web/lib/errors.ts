export type CreateTicketError = {
    type: "UNKNOWN_ERROR";
    message: string;
}

export type FetchError = {
    type: 'NOT_FOUND';
    message: string;
} | {
    type: 'FETCH_ERROR';
    message: string;
} | {
    type: 'UNKNOWN_ERROR';
    message: string;
}

export type CreateCommentError = {
    type: "UNKNOWN_ERROR";
    message: string;
}

export type UpdateTicketStatusError = {
    type: "UNKNOWN_ERROR";
    message: string;
}