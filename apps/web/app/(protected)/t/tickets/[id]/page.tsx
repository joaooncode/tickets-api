"use client";

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CalendarIcon, SendIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ticket = {
    id: 1,
    title: "Problema no login",
    description: "Descrição do ticket 1",
    status: "Em aberto",
    protocol: "1234567890",
    createdBy: "John Doe",
    sector: "TI",
    priority: "Alta",
    category: "Sistema",
    createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
}
const comentarios = [
    {
        id: 1,
        content: "Comentário 1",
        createdBy: "Usuario",
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    },
    {
        id: 2,
        content: "Comentário 2",
        createdBy: "Admin",
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    },
]

export default function TicketPage() {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <div className="flex flex-col gap-4 w-full items-center">
                <div className="w-full max-w-2xl flex flex-col gap-2 items-start">
                    <Link href="/t/dashboard">
                        <Button variant="outline" className="cursor-pointer">
                            <ArrowLeftIcon />
                            Voltar
                        </Button>
                    </Link>
                    <div className="flex flex-row gap-4 items-center">
                        <h2 className="text-2xl font-bold">Chamado #{id}</h2>
                        <Badge variant="outline" className={cn(ticket.status === "Em aberto" ? "bg-blue-100 text-blue-500" : ticket.status === "Em andamento" ? "bg-yellow-100 text-yellow-500" : ticket.status === "Concluído" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500")}>{ticket.status}</Badge>
                    </div>
                </div>
                {/* card ticket */}
                <div className="w-full max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex justify-between items-center gap-2">
                                    <span className="text-sm">{ticket.title}</span>
                                    <span className="text-sm">#{ticket.protocol}</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <div className="flex flex-col gap-2 mb-4">
                                    <span className="text-sm text-muted-foreground">Prioridade: <Badge variant="outline" className="bg-gray-100 text-gray-500">{ticket.priority}</Badge></span>
                                    <span className="text-sm text-muted-foreground">Categoria: <Badge variant="outline" className="bg-gray-100 text-gray-500">{ticket.category}</Badge></span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-gray-50 px-2 py-4 rounded-md mb-2">
                                        <span className="text-sm text-black">{ticket.description}</span>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4" />
                                            <span className="text-sm text-muted-foreground whitespace-nowrap">{ticket.createdBy} - {ticket.sector}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span className="text-sm text-muted-foreground whitespace-nowrap">{ticket.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                {/* card comentarios */}
                <div className="w-full max-w-2xl">
                    <h3 className="text-lg font-bold mb-4">Comentários ({comentarios.length})</h3>
                    <Card>
                        <CardContent>
                            <div className="flex flex-col gap-4 w-full">
                                {/* card comentario */}
                                <div className="flex flex-col gap-2 w-full ">
                                    {comentarios.map((comentario) => (
                                        <div key={comentario.id} className="flex flex-col gap-2 w-full bg-gray-100 p-4 py-6 rounded-lg">
                                            <div className="flex gap-2">
                                                <UserIcon className="w-4 h-4" />
                                                <span className="text-sm font-medium text whitespace-nowrap">{comentario.createdBy}</span>
                                                <span className="text-sm text-muted-foreground whitespace-nowrap">{comentario.createdAt}</span>
                                            </div>
                                            <div className="ml-6 py-4">
                                                <span className="text-sm w-full">{comentario.content}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="border-gray-200" />
                                {/* card add comentario text area */}
                                <div className="flex flex-col gap-2 w-full">
                                    <div>
                                        <Textarea
                                            placeholder="Escrever um comentário..."
                                            className="resize-none h-24"

                                        />
                                        {/* contagem de caracteres */}
                                        <span className="text-sm text-muted-foreground pl-2">0/1000</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button size="lg">
                                            <SendIcon className="w-4 h-4" />
                                            Enviar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card >
                </div >
            </div >
        </>
    )
}