import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: "id", type: "id" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { id, password } = credentials ?? {};
        console.log("id, password", id, password);
        if (!id || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user2.findUnique({
          where: {
            id,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        console.log("user", user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt callback");
      // console.log(token, user, account, profile, isNewUser);
      return token;
    },
    async session({ session, user, token }) {
      // console.log("session callback");
      // console.log(session, user, token);
      session.user.id = token.sub;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
