"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { createTicket } from "@/app/(actions)/userActions";
import { TicketPriority } from "@/prisma/generated/prisma/browser";
import { createTicketSchema, CreateTicketData, MAX_ATTACHMENT_BYTES } from "@/lib/schemas";
import { toast } from "sonner";
import { InputImageDropzone } from "@/components/dropzone";
import { useRouter } from "next/navigation";

export function NewTicketForm() {
    const form = useForm<CreateTicketData>({
        resolver: zodResolver(createTicketSchema),
        defaultValues: {
            category: "",
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
                            <FieldLabel htmlFor="form-rhf-input-category">
                                Categoria
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Categoria 1</SelectItem>
                                        <SelectItem value="2">Categoria 2</SelectItem>
                                        <SelectItem value="3">Categoria 3</SelectItem>
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
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-title">
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
                            <FieldLabel htmlFor="form-rhf-input-description">
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
                            <FieldLabel htmlFor="form-rhf-input-priority">
                                Prioridade
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={TicketPriority.NORMAL}>Normal</SelectItem>
                                        <SelectItem value={TicketPriority.URGENT}>Urgente</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    name="attachments"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-attachments">
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
