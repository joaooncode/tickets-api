import Header from "@/components/header";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="flex justify-center p-4 px-24 mb-16 min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    )
}