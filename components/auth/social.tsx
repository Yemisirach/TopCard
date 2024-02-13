"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FaApple, FaMicrosoft } from "react-icons/fa";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "azure-ad" | "apple") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-x-2">
      <div className="flex w-full">
        <Button
          size="lg"
          className="w-full Top-input"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="h-5 w-5 m-2" />
          Sign in Google
        </Button>
      </div>
      <div className="w-full mt-3 flex">
        <Button
          size="lg"
          className="w-full Top-input"
          variant="outline"
          onClick={() => onClick("azure-ad")}
        >
          <FaMicrosoft className="h-5 w-5 m-2" />
          Sign in Microsoft
        </Button>
      </div>
      <div className="w-full mt-3 flex">
        <Button
          size="lg"
          className="w-full Top-input"
          variant="outline"
          onClick={() => onClick("apple")}
        >
          <FaApple className="h-5 w-5 m-2" />
          Sign in Apple
        </Button>
      </div>
    </div>
  );
};
