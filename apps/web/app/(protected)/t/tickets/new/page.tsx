import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewTicketForm } from "@/components/new-ticket-form";
import GoBackButton from "@/components/go-back-button";

export default function NewTicketPage() {
    return (
        <>
            <div className="flex flex-col gap-4 w-full h-full">
                <GoBackButton href="/t/tickets" />
                <Card className="w-full mx-auto max-w-3xl pb-8">
                    <CardHeader>
                        <CardTitle>
                            Criar novo ticket
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NewTicketForm />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}