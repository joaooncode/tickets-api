import { User, UserRole } from "@/prisma/generated/prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { auth } from "@clerk/nextjs/server"

// utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExtension(file: File) {
  return file.name.split(".").pop()?.toLowerCase()
}

export function isAllowedExtension(file: File, allowed: string[]) {
  const ext = getExtension(file)
  return !!ext && allowed.includes(ext)
}


// action result type
export type ActionResult<T> =
  | { success: true; data: T | null; error: null }
  | { success: false; data: null; error: string }


// admin checks
/**
 * Checks if the user is an admin by their internal ID
 * @param userId - The user's internal ID
 * @returns a boolean
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })
  return user?.role === "ADMIN"
}

/**
 * Checks if the user is an admin by their Clerk user ID
 * @param clerkUserId - The user's Clerk user ID
 * @returns True if the user is an admin, false otherwise
 * @returns a boolean
 */
export async function isUserAdminByClerkUserId(clerkUserId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUserId },
    select: { role: true },
  })
  return user?.role === "ADMIN"
}

/**
 * Checks if the current logged in user is an admin
 * @returns a boolean
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) {
    return false
  }
  return isUserAdminByClerkUserId(userId)
}