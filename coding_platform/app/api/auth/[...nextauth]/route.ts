import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
      AppleProvider({
        clientId: process.env.APPLE_ID  ?? "",
        clientSecret: process.env.APPLE_SECRET  ?? "",
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID   ?? "",
        clientSecret: process.env.FACEBOOK_SECRET   ?? "",
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }