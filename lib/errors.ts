export type GetAllTicketsError =
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GetTicketByIdError =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GetAssignedTicketsByUserIdError =
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GetCreatedTicketsByUserIdError =
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type CreateTicketError =
    | { type: "UNAUTHORIZED"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type UpdateTicketStatusError =
    | { type: "NOT_FOUND"; message: string }
    | { type: "INVALID_STATUS"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type CreateCommentError =
    | { type: "TICKET_NOT_FOUND"; message: string }
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type FetchError =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }