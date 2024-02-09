import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/" legacyBehavior>
      <a className="hover:opacity-75 transition flex items-center gap-x-2 hidden md:flex">
        <Image src="/logo.png" alt="Logo" height={50} width={70} />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        ></p>
      </a>
    </Link>
  );
};
