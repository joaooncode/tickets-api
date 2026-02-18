import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import { isCurrentUserAdmin } from "./(actions)/adminActions";

export default async function HomePage() {

  const isAdmin = await isCurrentUserAdmin();

  return (
    <div className="flex flex-row gap-4 justify-center mt-16">
      <SignedOut>
        <Link href="/sign-in" className="w-fit">
          <Button variant="outline">Login</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        {isAdmin ? (
          <Link href="/admin/dashboard" className="w-fit">
            <Button variant="outline">Admin Dashboard</Button>
          </Link>
        ) : (
          <Link href="/t/dashboard" className="w-fit">
            <Button variant="outline">Dashboard</Button>
          </Link>
        )}
        <UserButton />
      </SignedIn>
    </div>
  )
}