import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

const isProtectedRoute = createRouteMatcher(["/t(.*)", "/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
	const { isAuthenticated } = await auth()

	if (!isAuthenticated && isProtectedRoute(req)) {
		redirect("/sign-in")
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
