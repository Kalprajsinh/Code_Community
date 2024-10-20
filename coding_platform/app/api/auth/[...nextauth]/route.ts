import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// Define GET and POST handlers
export async function GET(req: Request) {
  const response = await NextAuth(authOptions);
  return NextResponse.json(response);
}

export async function POST(req: Request) {
  const response = await NextAuth(authOptions);
  return NextResponse.json(response);
}

// export const GET = myfun;