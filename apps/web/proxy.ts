import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/t(.*)",
    "/admin(.*)"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
    const { isAuthenticated, has } = await auth();

    const isAdmin = has({ role: 'org:admin' })

    if (!isAuthenticated && isProtectedRoute(req)) {
        await auth.protect();
    }

    if (isAuthenticated && !isAdmin && isAdminRoute(req)) {
        return NextResponse.redirect(new URL("/not-found", req.url))
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
