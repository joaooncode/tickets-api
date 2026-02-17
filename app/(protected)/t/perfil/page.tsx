import { UserProfile } from "@clerk/nextjs";
import GoBackButton from "@/components/go-back-button";

export default function Perfil() {
    return (
        <>
            <GoBackButton href="/t/dashboard" />
            <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
                <UserProfile />
            </div>
        </>
    )
}