import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { isCurrentUserAdmin } from "./(actions)/adminActions";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Check } from "lucide-react";

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
      <div className="flex flex-col gap-4">
        <Timeline>
          <TimelineItem
            date={new Date('2024-01-01')}
            title="Feature Released"
            description="New timeline component is now available"
            icon={<Check />}
            status="completed"
          />
          <TimelineItem
            date={new Date('2024-01-02')}
            title="In Progress"
            description="Working on documentation"
            status="in-progress"
          />
          <TimelineItem
            date={new Date('2024-01-03')}
            title="Upcoming"
            description="Planning future updates"
            status="pending"
          />
        </Timeline>
      </div>
    </div>
  )
}