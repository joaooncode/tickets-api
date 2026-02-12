import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export default function HomePage() {

  return (
    <div className="flex flex-row gap-4 justify-center mt-16">
      <SignedOut>
        <Link href="/sign-in" className="w-fit">
          <Button variant="outline">Login</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/t/dashboard" className="w-fit">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <SignOutButton>
          <Button variant="outline">Logout</Button>
        </SignOutButton>
      </SignedIn>

    </div>
  )
}