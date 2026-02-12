"use server"

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from 'jose'

type SessionPayload = {
    userId: string;
    expiresAt: Date;
}

type LoginRequest = {
    email: string;
    password: string;
}

type LoginResponse = {
    access_token: string;
}

type LoginError = {
    type: "UNKNOWN_ERROR";
    error: Error;
}



export async function login(request: LoginRequest): Promise<{ success: boolean, error: string | null }> {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        //     method: "POST",
        //     body: JSON.stringify(request),
        // });

        // if (!res.ok) {
        //     throw new Error("Failed to login");
        // }

        // const data: LoginResponse = await res.json();

        const resData = {
            access_token: "abc123"
        }

        const userData = {
            user_id: "qwe123"
        }

        // const user = await getUser(resData.access_token);

        // set cookie with access_token
        await setAccessTokenCookie(resData.access_token);

        await createSession(userData.user_id);

        return {
            success: true,
            error: null,
        }
    } catch (error) {
        console.error("Failed to login:", error);
        return {
            success: false,
            error: (error as Error).message.toString(),
        };
    }

}

type User = {
    id: string;
    email: string;
    name: string;
    role: string;
}

export async function getUser(access_token: string): Promise<User> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    });
    return res.json();
}

const ACCESS_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

export async function setAccessTokenCookie(access_token: string): Promise<void> {
	try {
		const encrypted = await encryptToken(access_token)
		const cookieStore = await cookies()
		cookieStore.set('access_token', encrypted, {
			httpOnly: true,
			secure: true,
			maxAge: ACCESS_TOKEN_MAX_AGE,
			sameSite: 'lax',
			path: '/',
		})
	} catch (error) {
		console.error('Failed to set access token cookie:', error)
		throw error
	}
}

export async function getAccessToken(): Promise<string | null> {
	const cookieStore = await cookies()
	const encrypted = cookieStore.get('access_token')?.value
	return decryptToken(encrypted)
}



const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type TokenPayload = { token: string }

async function encryptToken(token: string): Promise<string> {
	return new SignJWT({ token } as TokenPayload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey)
}

async function decryptToken(encrypted: string | undefined): Promise<string | null> {
	try {
		if (!encrypted) return null
		const { payload } = await jwtVerify(encrypted, encodedKey, {
			algorithms: ['HS256'],
		})
		const token = (payload as TokenPayload).token
		return typeof token === 'string' ? token : null
	} catch {
		return null
	}
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession() {
    try {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)

        console.log("Session decrypted:", session);

        if (!session) {
            return null;
        }

        return session

    } catch (error) {
        console.error("Failed to get session:", error);
        return null;
    }
}