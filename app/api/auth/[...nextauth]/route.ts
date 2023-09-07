import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import axios from "axios";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email", placeholder: "enter your email" },
        password: { type: "password", placeholder: "enter your password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials!");
        }

        // console.log(credentials);
        try {
          const options = {
            method: "POST",
            url: "https://q-treval-backend.vercel.app/api/user/login",
            data: { email: credentials.email, password: credentials.password },
          };

          const { data } = await axios.request(options);
          const user = {
            ...data.data.userData,
            accessToken: data.data.accessToken,
          };
          return user;
        } catch (error: any) {
          // console.log(error.response.data.message);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
