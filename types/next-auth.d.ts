import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      name:string;
      email: string;
      token: string;
    };
  }
}