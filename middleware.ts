import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // return Response.redirect(new URL(
    //   `/auth/login?callbackUrl=${encodedCallbackUrl}`,
    //   nextUrl
    // ));

    Response.json({
      redirect: `/auth/login?callbackUrl=${encodedCallbackUrl}`,
    });
    return null;
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";

// import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { GetSessionParams, getSession } from "next-auth/react";
// import { CustomSession } from "@/types";
// // Destructure the relevant parts from NextAuth configuration
// interface CustomGetSessionParams extends GetSessionParams {
//   req: NextApiRequest;
// }
// const { auth } = NextAuth(authConfig);

// console.log("🚀 ~ auth:", auth);

// const authenticationMiddleware: NextApiHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   // const session = (await getSession({
//   //   req,
//   // } as GetSessionParams)) as CustomSession;
//   // Your authentication logic goes here...
//   // if (!session?.user && !publicRoutes.includes(req.url?.path
//   // console.log("🚀 ~ session:", session);
//   //   ? req.url.pathname : "")) {
//   //     if (req.method === "GET") {
//   //       // Redirect to login page with a callback url that points back to where user tried to access
//   //       const redirectToLoginWithCallback = `${DEFAULT_LOGIN_REDIRECT}${
//   //         process.env.NODE_ENV !== "development" ? `?callbackUrl=` :
//   //         `/?callbackUrl=`
//   //         }${encodeURIComponent(`${req.headers.referer || req.url}`)}
//   //         `;
//   //       }
//   //     }

//   // const userRole = session.auth.userRole;
//   // // For example, redirect to login page if not authenticated
//   // if (!session) {
//   //   res.writeHead(302, { Location: "/auth/login" });
//   //   res.end();
//   //   return null;
//   // }

//   // Extract auth information from the session
//   // const isLoggedIn = !!session.auth;
//   // const { nextUrl } = req;
//   const { auth } = NextAuth(authConfig);
//   const isLoggedIn = !!req.auth;

//   const nextUrl = req.url || "/";
//   const isApiAuthRoute = nextUrl.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl);
//   const isAuthRoute = authRoutes.includes(nextUrl);

//   if (isApiAuthRoute) {
//     return null;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       // Corrected the syntax for redirect
//       res.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl).toString());
//       return null;
//     }
//     return null;
//   }

//   // Corrected the syntax for redirect
//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl;
//     // Add logic to append search parameters if needed

//     // const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     // res.redirect(
//     //   new URL(
//     //     `/auth/login?callbackUrl=${encodedCallbackUrl}`,
//     //     nextUrl
//     //   ).toString()
//     // );
//     return null;
//   }

//   return null;
// };

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   // Corrected the syntax for the matcher array
//   async headers() {
//     return [
//       {
//         source: "/((?!.+\\.[\\w]+$|_next).*)",
//         headers: [
//           {
//             key: "Content-Type",
//             value: "application/json",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default authenticationMiddleware;
