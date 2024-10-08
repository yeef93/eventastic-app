import NextAuth, { DefaultUser, DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string;
    username: string;
    scope: string;
    sub: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      username: string;
      scope: string;
      sub: string;
      refreshToken: string;
      avatar: string;
    } & DefaultSession["user"];
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      email: string;
      token: string;
      username: string;
      scope: string;
      sub: string;
    }
  }
}