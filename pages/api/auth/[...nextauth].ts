import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: "Custom login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Ingresa tu correo",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Ingresa tu contraseña",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 2592000, // cada 30d
    strategy: "jwt",
    updateAge: 86400, // cada 24h
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({ token, account, user });
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAUthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ token, session, user }) {
      // console.log({ token, session, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});
