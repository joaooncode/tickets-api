import { auth } from "@clerk/nextjs/server";

export async function getAuthHeaders(): Promise<HeadersInit> {
    const { getToken } = await auth();
    const token = await getToken();
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}