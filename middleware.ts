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

  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   return Response.redirect(new URL(
  //     `/auth/login?callbackUrl=${encodedCallbackUrl}`,
  //     nextUrl
  //   ));
  // }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const checkAccessControl: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Assuming the user role is stored in the session
    const userRole = session.user.role;

    // Implement your access control logic based on the user's role
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    // If the user has the required role, proceed to the next handler
    // You can call the next handler directly here if needed
  } catch (error) {
    console.error("Error checking access control:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
