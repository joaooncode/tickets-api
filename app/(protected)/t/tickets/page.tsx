import { redirect } from "next/navigation";

export default async function TicketsPage() {
    redirect("/t/tickets/new")
}