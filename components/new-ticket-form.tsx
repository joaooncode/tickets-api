"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { createTicket } from "@/app/(actions)/userActions";
import { TicketPriority } from "@/prisma/generated/prisma/browser";
import {
    createTicketSchema,
    CreateTicketData,
    MAX_ATTACHMENT_BYTES,
    TICKET_SETORES,
} from "@/lib/schemas";
import { toast } from "sonner";
import { InputImageDropzone } from "@/components/dropzone";
import { useRouter } from "next/navigation";

export function NewTicketForm() {
    const form = useForm<CreateTicketData>({
        resolver: zodResolver(createTicketSchema),
        defaultValues: {
            category: "",
            sector: "OUTRO",
            title: "",
            description: "",
            priority: TicketPriority.NORMAL,
            attachments: [],
        },
        mode: "onBlur",
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<CreateTicketData> = async (data) => {
        try {
            const formData = new FormData()
            formData.append('category', data.category)
            formData.append('sector', data.sector)
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('priority', data.priority)
            for (const file of data.attachments ?? []) {
                formData.append('attachments', file)
            }

            const result = await createTicket(formData)

            if (!result.success) {
                console.error("error creating ticket", result.error)
                toast.error(result.error ?? "Ocorreu um erro ao criar ticket")
                return
            }

            const createdTicketId = result.data

            toast.success("Ticket criado com sucesso")

            router.push(`/t/tickets/${createdTicketId}`)
        } catch (error) {
            console.error("error creating ticket", error)
            toast.error("Ocorreu um erro ao criar ticket")
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-category" className="text-xl font-bold">
                                Categoria
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="SISTEMA">Sistema</SelectItem>
                                        <SelectItem value="HARDWARE">Hardware</SelectItem>
                                        <SelectItem value="SOFTWARE">Software</SelectItem>
                                        <SelectItem value="REDE">Rede</SelectItem>
                                        <SelectItem value="SEGURANÇA">Segurança</SelectItem>
                                        <SelectItem value="OUTRO">Outro</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                O título do ticket deve ser claro e conciso, entre 10 e 100 caracteres.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="sector"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-sector" className="text-xl font-bold">
                                Setor
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Setor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {TICKET_SETORES.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>
                                                {s.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                Setor da clínica ao qual o ticket se refere.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-title" className="text-xl font-bold">
                                Titulo
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-input-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Título do ticket"
                                autoComplete="title"
                            />
                            <FieldDescription>
                                O título do ticket deve ser claro e conciso, entre 10 e 100 caracteres.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-description" className="text-xl font-bold">
                                Descrição
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="form-rhf-input-description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Descrição do ticket"
                                className="min-h-[200px] resize-none"
                            />
                            <FieldDescription>
                                A descrição do ticket deve ser clara e concisa, entre 10 e 1000 caracteres.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-priority" className="text-xl font-bold">
                                Prioridade
                            </FieldLabel>
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-3"
                            >
                                <FieldLabel
                                    htmlFor="priority-urgent"
                                    className="cursor-pointer rounded-md border p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10"
                                >
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle className="text-lg font-bold">🔴 Urgente</FieldTitle>
                                            <FieldDescription>
                                                Chamados que impedem atendimento médico ou
                                                colocam pacientes em risco.
                                            </FieldDescription>
                                            <p className="text-muted-foreground text-sm mt-2">
                                                Marque como urgente quando houver:
                                            </p>
                                            <ul className="text-muted-foreground text-xs mt-1 list-disc list-inside space-y-0.5">
                                                <li>Sistema crítico fora do ar (prontuário, agendamento, faturamento)</li>
                                                <li>Equipamento essencial parado (recepção, impressora, internet)</li>
                                                <li>Bloqueio total de usuário essencial (médico, recepcionista)</li>
                                                <li>Situação que impacta pacientes agora (fila parada, atendimento interrompido)</li>
                                            </ul>
                                            <p className="text-muted-foreground text-sm mt-2 font-medium">
                                                👉 Se o problema impede atendimento imediato, é URGENTE.
                                            </p>
                                        </FieldContent>
                                        <RadioGroupItem
                                            value={TicketPriority.URGENT}
                                            id="priority-urgent"
                                        />
                                    </Field>
                                </FieldLabel>
                                <FieldLabel
                                    htmlFor="priority-normal"
                                    className="cursor-pointer rounded-md border p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10"
                                >
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle className="text-lg font-bold">🟡 Normal</FieldTitle>
                                            <FieldDescription>
                                                Chamados que não bloqueiam atendimento.
                                            </FieldDescription>
                                            <ul className="text-muted-foreground text-xs mt-2 list-disc list-inside space-y-0.5">
                                                <li>Instalar software, criar usuário, trocar senha (com alternativa)</li>
                                                <li>Impressora auxiliar com problema, dúvida de uso</li>
                                                <li>Melhorias no sistema, solicitação de novo equipamento</li>
                                            </ul>
                                            <p className="text-muted-foreground text-sm mt-2 font-medium">
                                                👉 Se o atendimento continua funcionando, é NORMAL.
                                            </p>
                                        </FieldContent>
                                        <RadioGroupItem
                                            value={TicketPriority.NORMAL}
                                            id="priority-normal"
                                        />
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="attachments"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-attachments" className="text-xl font-bold">
                                Anexos
                            </FieldLabel>

                            <InputImageDropzone
                                value={field.value ?? []}
                                onChange={field.onChange}
                                maxFiles={5}
                                maxSize={MAX_ATTACHMENT_BYTES}
                            />

                            <FieldDescription>
                                Você pode enviar até 5 anexos, cada um com até 1MB.
                            </FieldDescription>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

            </FieldGroup>
            <div className="mt-6">
                {form.formState.isSubmitting ? (
                    <Button type="submit" className="w-full" disabled>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Criando ticket...
                    </Button>
                ) : (
                    <Button type="submit" className="w-full">
                        Criar ticket
                    </Button>
                )}
            </div>
        </form>
    )
}
