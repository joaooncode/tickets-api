import { z } from "zod";
import { TicketPriority } from "@/prisma/generated/prisma/browser";

/** Tamanho máximo por anexo (1MB) em bytes */
export const MAX_ATTACHMENT_BYTES = 1024 * 1024;

/** Valores dos setores para z.enum (tupla) */
const TICKET_SETOR_VALUES = [
    "RECEPCAO",
    "ATENDIMENTO",
    "PRONTUARIO",
    "FARMACIA",
    "LABORATORIO",
    "IMAGEM",
    "ADMINISTRATIVO",
    "TI",
    "LIMPEZA_MANUTENCAO",
    "OUTRO",
] as const;

/** Lista de setores (clínica médica) para uso no formulário */
export const TICKET_SETORES: { value: (typeof TICKET_SETOR_VALUES)[number]; label: string }[] = [
    { value: "RECEPCAO", label: "Recepção" },
    { value: "ATENDIMENTO", label: "Atendimento ao Paciente" },
    { value: "PRONTUARIO", label: "Prontuário / Secretaria Médica" },
    { value: "FARMACIA", label: "Farmácia" },
    { value: "LABORATORIO", label: "Laboratório" },
    { value: "IMAGEM", label: "Imagem (Raio-X, Ultrassom)" },
    { value: "ADMINISTRATIVO", label: "Administrativo" },
    { value: "TI", label: "TI / Suporte" },
    { value: "LIMPEZA_MANUTENCAO", label: "Limpeza e Manutenção" },
    { value: "OUTRO", label: "Outro" },
];

export const createTicketSchema = z.object({
    category: z.string()
        .min(1, "Categoria é obrigatória")
        .max(100, "Categoria precisa ter no máximo 100 caracteres"),
    setor: z.enum(TICKET_SETOR_VALUES, { message: "Setor é obrigatório" }),
    title: z.string()
        .min(1, "Título é obrigatório")
        .max(100, "Título precisa ter no máximo 100 caracteres"),
    description: z.string()
        .min(10, "Descrição precisa ter pelo menos 10 caracteres")
        .max(1000, "Descrição precisa ter no máximo 1000 caracteres"),
    priority: z.enum(TicketPriority, { message: "Prioridade é obrigatória" }),
    attachments: z
        .array(z.instanceof(File))
        .max(5)
        .refine(
            files =>
                files.every(file => {
                    const ext = file.name.split(".").pop()?.toLowerCase()
                    return ["jpg", "jpeg", "png"].includes(ext ?? "")
                }),
            "Apenas imagens JPG, JPEG ou PNG"
        )
        .refine(
            files => files.every(file => file.size <= MAX_ATTACHMENT_BYTES),
            "Cada anexo deve ter no máximo 1MB"
        ),
})

export type CreateTicketData = z.infer<typeof createTicketSchema>

/** Schema para validação no servidor (campos como string; attachments como paths) */
export const createTicketServiceSchema = z.object({
    category: z.string().min(1).max(100),
    setor: z.enum(TICKET_SETOR_VALUES),
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(1000),
    priority: z.enum(TicketPriority),
    attachments: z.array(z.string()),
})

export type CreateTicketServiceInput = z.infer<typeof createTicketServiceSchema>