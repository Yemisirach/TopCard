import Image from "next/image";

export const Topbg = () => {
  return (
    <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
      <Image src="/hero-img.png" alt="bg" height={400} width={500} />
    </div>
  );
};
