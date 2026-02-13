/**
 * Tipo de erro unificado para falhas do Prisma (P2025, P2002, P2003, etc.).
 * Usado pelo prisma.ticket.service para retornos neverthrow.
 */

export type PrismaError =
	| { type: 'NOT_FOUND'; message: string }
	| { type: 'RECORD_NOT_FOUND'; message: string }
	| { type: 'UNIQUE_VIOLATION'; message: string }
	| { type: 'FOREIGN_KEY_VIOLATION'; message: string }
	| { type: 'VALIDATION_ERROR'; message: string }
	| { type: 'CONNECTION_ERROR'; message: string }
	| { type: 'UNKNOWN'; message: string }
