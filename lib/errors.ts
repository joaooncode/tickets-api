export type GET_ALL_TICKETS_ERROR =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GET_TICKET_BY_ID_ERROR =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GET_ASSIGNED_TICKETS_BY_USER_ID_ERROR =
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "TICKETS_NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type GET_CREATED_TICKETS_BY_USER_ID_ERROR =
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "TICKETS_NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type CREATE_TICKET_ERROR =
    | { type: "UNAUTHORIZED"; message: string }
    | { type: "CREATE_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type UPDATE_TICKET_STATUS_ERROR =
    | { type: "NOT_FOUND"; message: string }
    | { type: "INVALID_STATUS"; message: string }
    | { type: "UPDATE_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type CREATE_COMMENT_ERROR =
    | { type: "TICKET_NOT_FOUND"; message: string }
    | { type: "USER_NOT_FOUND"; message: string }
    | { type: "CREATE_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export type FETCH_ERROR =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }