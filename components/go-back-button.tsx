import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function GoBackButton({ href }: { href: string }) {
    return (
        <Link href={href} className="w-fit h-fit">
            <Button variant="outline" className="cursor-pointer">
                <ArrowLeftIcon />
                Voltar
            </Button>
        </Link>
    )
}