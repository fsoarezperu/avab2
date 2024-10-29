import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        if (url === baseUrl || url === `${baseUrl}/`) {
          return `${baseUrl}/dashboard`
        }
        return url
      }
      return baseUrl
    },
    async session({ session, token }) {
      return session
    },
  }
});

export { handler as GET, handler as POST }; 