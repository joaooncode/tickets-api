import { redirect } from "next/navigation"
import { getCurrentUserRole } from "@/app/_actions"
import { UserRole } from "@/prisma/generated/prisma/client"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
	children,
}: { children: React.ReactNode }) {
	const role = await getCurrentUserRole()
	if (role !== UserRole.ADMIN) {
		redirect("/not-found")
	}
	return (
		<>
			<h1>Admin</h1>
			{children}
		</>
	)
}