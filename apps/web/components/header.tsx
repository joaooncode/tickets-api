import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { UserButtonClient } from "@/components/user-button-client";
import { Suspense } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

const links = [
    {
        label: "Inicio",
        href: "/t/dashboard"
    },
    {
        label: "Meus Chamados",
        href: "/t/tickets"
    },
    {
        label: "Perfil",
        href: "/t/perfil"
    },

]

const adminLinks = [
    {
        label: "Usuarios",
        href: "/admin/usuarios"
    }
]


export default async function Header() {
    const { has } = await auth();
    const user = await currentUser();
    const isAdmin = has({ role: 'org:admin' })

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200 px-20">
                <div className="flex items-center gap-2">
                    <Image src="/logo.jpg" alt="Logo" width={50} height={50} className="rounded-full" />
                    <h1 className="text-xl font-bold">Sistema de Chamados</h1>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 mr-8">
                        {links.map((link) => (
                            <Link href={link.href} key={link.label}>
                                <Button variant="link" className="cursor-pointer">{link.label}</Button>
                            </Link>
                        ))}
                        {isAdmin && adminLinks.map((link) => (
                            <Link href={link.href} key={link.label}>
                                <Button variant="link" className="cursor-pointer">{link.label}</Button>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-8">
                        <Suspense fallback={<div>Carregando...</div>}>
                            <div className="flex items-center gap-2 rounded-xl px-2">
                                <UserButtonClient />
                                <div className="flex flex-col">
                                    <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                                    <span className="text-sm text-gray-500">{user?.emailAddresses[0]?.emailAddress}</span>
                                </div>
                            </div>
                        </Suspense>
                        <SignOutButton redirectUrl="/sign-in">
                            <Button variant="outline" className="cursor-pointer">
                                <LogOutIcon />Sair
                            </Button>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        </>
    )
}