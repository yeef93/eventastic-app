import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          console.log(apiUrl);
          const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usernameOrEmail: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          console.log(res.status); // Log the HTTP status code
          console.log(res.statusText); // Log the status text
      
          if (res.ok) {
            const user = await res.json();
            console.log(user); // Log the user data
            return { ...user, token: user.token };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Authentication failed:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
};

// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//           console.log(apiUrl);
//           const res = await fetch(`${apiUrl}/auth/login`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               usernameOrEmail: credentials?.email,
//               password: credentials?.password,
//             }),
//           });
      
//           console.log(res.status); // Log the HTTP status code
//           console.log(res.statusText); // Log the status text
      
//           if (res.ok) {
//             const user = await res.json();
//             console.log(user); // Log the user data
//             return { ...user, token: user.token };
//           } else {
//             throw new Error("Invalid credentials");
//           }
//         } catch (error) {
//           console.error("Authentication failed:", error);
//           throw new Error("Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.token = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string; 
//       session.user.email = token.email as string; 
//       session.user.token = token.token as string; 
//       return session;
//     },
//   },  
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(options);
