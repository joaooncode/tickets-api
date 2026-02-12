"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, CheckIcon, Loader2Icon, ChartBarIcon, CalendarIcon, MessageSquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statuses = [
    {
        label: "Total",
        value: 3,
        color: "bg-gray-100",
        icon: <ChartBarIcon className="w-4 h-4 text-gray-500" />
    },
    {
        label: "Em aberto",
        value: 0,
        color: "bg-blue-100",
        icon: <ClockIcon className="w-4 h-4 text-blue-500" />
    },
    {
        label: "Em andamento",
        value: 1,
        color: "bg-yellow-100",
        icon: <Loader2Icon className="w-4 h-4 text-yellow-500" />
    },
    {
        label: "Concluído",
        value: 2,
        color: "bg-green-100",
        icon: <CheckIcon className="w-4 h-4 text-green-500" />
    }
]

const chamados = [
    {
        id: 1,
        title: "Chamado 1",
        description: "Descrição do chamado 1",
        status: "Em aberto",
        createdBy: "John Doe",
        sector: "TI",
        priority: "Alta",
        category: "Software",
        comments: [
            {
                id: 1,
                content: "Comentário 1",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
            {
                id: 2,
                content: "Comentário 2",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
        ],
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    },
    {
        id: 2,
        title: "Chamado 2",
        description: "Descrição do chamado 2",
        status: "Em andamento",
        createdBy: "John Doe",
        sector: "TI",
        priority: "Alta",
        category: "Software",
        comments: [
            {
                id: 1,
                content: "Comentário 1",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
            {
                id: 2,
                content: "Comentário 2",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
        ],
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    },
    {
        id: 3,
        title: "Chamado 3",
        description: "Descrição do chamado 3",
        status: "Concluído",
        createdBy: "John Doe",
        sector: "TI",
        priority: "Alta",
        category: "Software",
        comments: [
            {
                id: 1,
                content: "Comentário 1",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
            {
                id: 2,
                content: "Comentário 2",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
        ],
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    },
    {
        id: 4,
        title: "Chamado 4",
        description: "Descrição do chamado 4",
        status: "Cancelado",
        createdBy: "John Doe",
        sector: "TI",
        priority: "Alta",
        category: "Software",
        comments: [
            {
                id: 1,
                content: "Comentário 1",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
            {
                id: 2,
                content: "Comentário 2",
                createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            },
        ],
        createdAt: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    }
]

export default function Dashboard() {
    const handleClick = (status: typeof statuses[0]) => {
        console.log(
            {
                status: status.label,
                total: status.value
            });
    }
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col items-start w-full">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4 mt-4 w-full mb-8">
                    {statuses.map((status) => (
                        <Card
                            key={status.label}
                            className="w-full cursor-pointer transition-shadow hover:shadow-lg"
                            onClick={() => handleClick(status)}
                        >
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${status.color}`}>
                                        {status.icon}
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-bold">{status.value}</p>
                                        <h2 className="text-sm text-muted-foreground">{status.label}</h2>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">Recentes</h2>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    {chamados.map((chamado) => (
                        <Card key={chamado.id} className="w-full cursor-pointer transition-shadow hover:shadow-lg" onClick={() => router.push(`/t/tickets/${chamado.id}`)}>
                            <CardHeader>
                                <div className="flex justify-between items-start gap-2 w-full">
                                    <CardTitle>{chamado.title}</CardTitle>
                                    <Badge className={cn(chamado.status === "Em aberto" ? "bg-blue-100 text-blue-500" : chamado.status === "Em andamento" ? "bg-yellow-100 text-yellow-500" : chamado.status === "Concluído" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500")}>{chamado.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{chamado.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-between items-center gap-2 w-full border-t border-gray-200">
                                    <div className="flex gap-2 items-center  w-full pt-2">
                                        <div className="flex gap-2 items-center mr-2">
                                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">Criado em: {chamado.createdAt}</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{chamado.comments.length}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center whitespace-nowrap">
                                        <span className="text-sm text-muted-foreground">{chamado.createdBy} - {chamado.sector}</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}