// import bcrypt from "bcryptjs";
// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// // import Microsoft from "next-auth/providers/microsoft";
// // import  Apple from "next-auth/providers/apple";
// import Google from "next-auth/providers/google";

// import { LoginSchema } from "@/schemas";
// import { getUserByEmail } from "@/data/user";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     //   Microsoft({
//     //   clientId: process.env.MICROSOFT_CLIENT_ID,
//     //   clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//     // }),
//     // Apple({
//     //   clientId: process.env.APPLE_CLIENT_ID,
//     //   clientSecret: process.env.APPLE_CLIENT_SECRET,
//     // }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;
          
//           const user = await getUserByEmail(email);
//           if (!user || !user.password) return null;

//           const passwordsMatch = await bcrypt.compare(
//             password,
//             user.password,
//           );

//           if (passwordsMatch) return user;
//         }

//         return null;
//       }
//     })
//   ],
// } satisfies NextAuthConfig

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig