import { Plus } from "lucide-react";
// import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrgFormPopover } from "@/components/form/organization-form-popover";

import { MobileSidebar } from "./mobile-sidebar";
import { currentUser } from "@/lib/auth";
import { LoginButton } from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

export const DshBoardNavbar = async () => {
  const user = await currentUser();
  console.log(user, "yemit");
  // @ts-ignore
  const isLoggedIn = user?.isOAuth === true;
  const firstName = user?.name
    ? user.name.split(" ")[0].charAt(0).toUpperCase() +
      user.name.split(" ")[0].slice(1)
    : "";

  return (
    <nav className="fixed z-50  top-0 pr-2 w-full h-14 shadow-sm flex items-center">
      <MobileSidebar />
      <div className="top-navs fixed top-0 w-full h-14 px-4 border-b shadow-md  flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          {isLoggedIn ? (
            <div className="flex items-center p-1 align-middle">
              <Logo />
              <OrgFormPopover align="start" side="bottom" sideOffset={18}>
                <Button
                  variant="transparent"
                  size="sm"
                  className="rounded-sm ml-7 create-work hidden md:block h-auto  py-1.5 px-2"
                >
                  Create
                </Button>
              </OrgFormPopover>
              <div className="h-14 mr-6 px-4 pr-8 m-1">
                <div className="mt-4 w-0 gets flex items-center justify-start  Tabsstyles__TabGroup-sc-1grh34k-2 hniXih">
                  <button
                    aria-expanded="false"
                    data-active="false"
                    data-testid="bignav-tab"
                    className="pl-7 flex items-center text-center Tabsstyles__Tab-sc-1grh34k-1 fvBJJk"
                  >
                    Workspace
                    <svg
                      className="pl-2"
                      fill="currentColor"
                      height="8"
                      viewBox="0 0 13 8"
                      width="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m11.7305.59279c.3626.362629.3885.93447.0777 1.32699l-.0777.08722-4.99999 4.99999c-.36263.36263-.93446.38853-1.32697.0777l-.08725-.0777-4.999959-4.99997c-.3905249-.39052-.3905242-1.023685 0-1.414209.362629-.36263.934469-.388553 1.326989-.077728l.08722.077728 4.29292 4.292139 4.29284-4.29216c.3626-.36263.9345-.388532 1.327-.077707z"></path>
                    </svg>
                  </button>
                  <button
                    aria-expanded="false"
                    data-active="false"
                    data-testid="bignav-tab"
                    className="pl-7 flex items-center text-center Tabsstyles__Tab-sc-1grh34k-1 fvBJJk"
                  >
                    Recent
                    <svg
                      className="pl-2"
                      fill="currentColor"
                      height="8"
                      viewBox="0 0 13 8"
                      width="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m11.7305.59279c.3626.362629.3885.93447.0777 1.32699l-.0777.08722-4.99999 4.99999c-.36263.36263-.93446.38853-1.32697.0777l-.08725-.0777-4.999959-4.99997c-.3905249-.39052-.3905242-1.023685 0-1.414209.362629-.36263.934469-.388553 1.326989-.077728l.08722.077728 4.29292 4.292139 4.29284-4.29216c.3626-.36263.9345-.388532 1.327-.077707z"></path>
                    </svg>
                  </button>
                  <button
                    aria-expanded="false"
                    data-active="false"
                    data-testid="bignav-tab"
                    className="pl-7 flex items-center text-center Tabsstyles__Tab-sc-1grh34k-1 fvBJJk"
                  >
                    Stared
                    <svg
                      className="pl-2"
                      fill="currentColor"
                      height="8"
                      viewBox="0 0 13 8"
                      width="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m11.7305.59279c.3626.362629.3885.93447.0777 1.32699l-.0777.08722-4.99999 4.99999c-.36263.36263-.93446.38853-1.32697.0777l-.08725-.0777-4.999959-4.99997c-.3905249-.39052-.3905242-1.023685 0-1.414209.362629-.36263.934469-.388553 1.326989-.077728l.08722.077728 4.29292 4.292139 4.29284-4.29216c.3626-.36263.9345-.388532 1.327-.077707z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Logo />
          )}
          <div className="space-x-4 md:block md:w-auto flex flex-row items-center justify-between w-full">
            <div>
              {isLoggedIn ? (
                <div className="flex items-center p-1 align-middle">
                  <div className="flex pr-3">
                    <article className="pr-1">Hi</article>
                    {firstName}
                  </div>
                  <UserButton />
                </div>
              ) : (
                <div className="p-2 flex items-center justify-between w-full">
                  <LoginButton asChild>
                    <Button
                      className="m-2 login-btn"
                      variant="secondary"
                      size="lg"
                    >
                      Login
                    </Button>
                  </LoginButton>
                  <Button
                    className="h-[40px] bg-gradient-to-r from-gray-600 to-blue-600 text-white"
                    size="sm"
                    asChild
                  >
                    <Link href="/auth/register">Get started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              }
            }
          }}
        />
      </div> */}
    </nav>
  );
};
