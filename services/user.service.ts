import { prisma } from "@/lib/prisma"
import { User, UserRole } from "@/prisma/generated/prisma/client"
import { ok, err, Result } from "neverthrow"

type USER_ERRORS =
    | { type: "NOT_FOUND"; message: string }
    | { type: "FETCH_ERROR"; message: string }
    | { type: "UNKNOWN_ERROR"; message: string }

export const userService = {
    /**
     * Fetches all users from the database (REQUIRE ADMIN ROLE)
     * @param userRole? - The role of the users to fetch
     * @param isActive? - Whether the users should be active
     * @returns a Result<User[], USER_ERRORS>
     */
    async getAllUsers(userRole?: UserRole, isActive?: boolean): Promise<Result<User[], USER_ERRORS>> {
        try {
            const users = await prisma.user.findMany({
                where: {
                    role: userRole,
                    isActive: isActive
                }
            })

            if (!users) {
                return err({ type: "NOT_FOUND", message: "Users not found" })
            }

            return ok(users)
        } catch (error) {
            return err({ type: "FETCH_ERROR", message: "Failed to fetch users" })
        }
    },
    /**
     * Gets a user by their internal ID (REQUIRE ADMIN ROLE)
     * @param userId - The user's internal ID
     * @returns a Result<User, USER_ERRORS>
     */
    async getUserById(userId: string): Promise<Result<User, USER_ERRORS>> {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } })

            if (!user) {
                return err({ type: "NOT_FOUND", message: "User not found" })
            }

            return ok(user)
        } catch (error) {
            console.error("[getUserById] Error", error)
            return err({ type: "FETCH_ERROR", message: "Failed to fetch user" })
        }
    },
    /**
     * Gets the internal user ID by the Clerk ID
     * @param clerkId - The user's Clerk ID
     * @returns a Result<string, USER_ERRORS>
     */
    async getInternalUserIdByClerkId(clerkId: string): Promise<Result<string, USER_ERRORS>> {
        try {
            const user = await prisma.user.findUnique({ where: { clerkUserId: clerkId } })

            if (!user) {
                console.error("[getInternalUserIdByClerkId] User not found", clerkId)
                return err({ type: "NOT_FOUND", message: "User not found" })
            }

            return ok(user.id)
        } catch (error) {
            console.error("[getInternalUserIdByClerkId] Error", error)
            return err({ type: "FETCH_ERROR", message: "Failed to fetch user" })
        }
    }
}