"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] sign-ins shadow-md">
      <CardHeader className="login-font">
        <Header label={headerLabel} />
      </CardHeader>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <div className="flex ml-5 mr-5 p-2 justify-center align-middle">
        <hr className="border-gray-200 w-[150px] mt-3 dark:border-gray-700" />
        <article className="ml-3 mr-3 text-center ">Or</article>
        <hr className="border-gray-200 w-[150px]  mt-3 dark:border-gray-700" />
      </div>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
