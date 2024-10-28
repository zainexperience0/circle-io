import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./next-auth.config";
import { generateFromEmail } from 'unique-username-generator'

export const {
    handlers: {
        GET,
        POST
    },
    auth,
    signIn
} = NextAuth({
    adapter: PrismaAdapter(db),
    pages: {
        signIn: "/auth/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub
            }
            if (token.username) {
                session.user.username = token.username as string
            }
            return session
        },
        async jwt({ token }) {
            const id = token.sub
            if (!id) return token
            const dbUser = await db.user.findUnique({
                where: {
                    id
                },
                select: {
                    username: true
                }
            })

            if (!dbUser) return token
            return {
                ...token,
                username: dbUser.username
            }
        }
    },
    events: {
        createUser: async ({ user }) => {
            const email = user.email || ""
            const username = generateFromEmail(email, 3)

            await db.user.update({
                where: {
                    email
                },
                data: {
                    username
                }
            })
        }
    },
    ...authConfig
})