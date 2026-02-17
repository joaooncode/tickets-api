import { z } from "zod";
import { Priority } from "./types";

export const createTicketSchema = z.object({
    category: z.string()
        .min(1, "Categoria é obrigatória")
        .max(100, "Categoria precisa ter no máximo 100 caracteres"),
    title: z.string()
        .min(1, "Título é obrigatório")
        .max(100, "Título precisa ter no máximo 100 caracteres"),
    description: z.string()
        .min(10, "Descrição precisa ter pelo menos 10 caracteres")
        .max(1000, "Descrição precisa ter no máximo 1000 caracteres"),
    priority: z.enum(Priority, { message: "Prioridade é obrigatória" }),
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

})

export type CreateTicketData = z.infer<typeof createTicketSchema>;