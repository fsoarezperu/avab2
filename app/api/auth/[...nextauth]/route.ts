import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Buscar o crear usuario
          const existingUser = await prisma.user.upsert({
            where: {
              email: user.email!,
            },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              email: user.email!,
              name: user.name,
              image: user.image,
            },
          })
          return true
        } catch (error) {
          console.error("Error saving user:", error)
          return false
        }
      }
      return true
    },
  },
})

export { handler as GET, handler as POST } 