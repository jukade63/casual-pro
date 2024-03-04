
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL } from "@/lib/constants";


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in', 
  },
  providers: [
    Credentials({
      id: "email-password",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
          if(!credentials?.email || !credentials?.password) {
            return null;
          }
          const resp = await fetch(BACKEND_URL + "/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          })
          if(!resp.ok) {
            return null;
          }
          const data = await resp.json();
          if(data?.error) {
            return null;
          }
          return data;
      },           
    })
     
  ],
 

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        console.log({session});
        
        return {
          ...token,
          user: {
            ...user,
            ...session.user
          }
        }
      }
      
      if (user) return {...token, ...user}
      return token;
    },
    session: async ({ token, session }) => {
      session.user = token.user
      session.accessToken = token.accessToken
      return session;
    },
  
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
  },
  jwt: {
    maxAge: 24 * 60 * 60
  }


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



// //---- tried to separate custom sign in page, but did not work-------

// // const NextAuthConfiguration = ({ req }: { req: NextApiRequest }, ...options: any[]) => {
// //   const url = req ? `${req.headers.host}${req.url}` : 'fallback-url';
// //   let signInPagePath = "/worker/sign-in";
  
  
// //   if (url.includes("/worker/sign-in")) {
// //     signInPagePath = "/worker/sign-in"; 
// //   } else if (url.includes("/business/sign-in")) {
// //     signInPagePath = "/business/sign-in"; 
// //   }

// //   return NextAuth({
// //     providers: [
// //       Credentials({
// //         credentials: {
// //           email: { label: "Email", type: "email" },
// //           password: { label: "Password", type: "password" },
// //         },
// //         authorize: async (credentials) => {
// //             if(!credentials?.email || !credentials?.password) {
// //               return null;
// //             }
// //             const resp = await fetch(BACKEND_URL + "/users/login", {
// //               method: "POST",
// //               headers: {
// //                 "Content-Type": "application/json",
// //               },
// //               body: JSON.stringify(credentials),
// //             })

// //             return resp.json();
// //         }
// //       })
// //     ],
// //     pages: {
// //       signIn: signInPagePath, 
// //     },

// //     callbacks: {
// //       session: async ({ session, user }) => {
// //         if (session.user) {
// //           session.user.name = user.id;
// //         }
// //         return session;
// //       },
// //       jwt: async ({ token, user }) => {
// //         if (user) {
// //           token.id = user.id;
// //         }
// //         return token;
// //       }
// //     },

// //     ...options
// //   });
// // };

// // const handler = NextAuthConfiguration;


// // export default NextAuthConfiguration;