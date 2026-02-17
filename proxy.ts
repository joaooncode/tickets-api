import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/t(.*)", "/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
	const { isAuthenticated } = await auth()

	if (!isAuthenticated && isProtectedRoute(req)) {
		await auth.protect()
	}

	return NextResponse.next()
})

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
