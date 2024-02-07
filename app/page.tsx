import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
import localFont from "next/font/local";
import { Medal } from "lucide-react";
import { Topbg } from "@/components/topbg";
import { Navbar } from "./_components/navbar";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-full flex-row items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <div className="top flex items-center justify-center flex-col">
          <div
            className={cn(
              "flex items-center justify-center flex-col",
              headingFont.className
            )}
          >
            <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-bluelight-700 rounded-full uppercase">
              <Medal className="h-6 w-6 mr-2" />
              Top Beverage industry and trading
            </div>
            <h1 className="text-3xl md:text-5xl text-center text-neutral-100 mb-1">
              {/* <Medal className="h-6 w-6 mr-2" /> */}
              Top helps team move work forward.
            </h1>
            {/* <div className="text-3xl md:text-6xl bg-gradient-to-r from-gray-600 to-blue-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          </div> */}
          </div>
          <div
            className={cn(
              "text-sm md:text-xl text-neutral-200 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
              textFont.className
            )}
          >
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with Top.
          </div>
          <LoginButton asChild>
            <Button
              className="bg-gradient-to-r mt-3 from-gray-600 to-blue-600 text-white"
              variant="secondary"
              size="lg"
            >
              Get started
            </Button>
          </LoginButton>
        </div>
        <div>
          <Topbg />
        </div>
      </main>
    </>
  );
}
