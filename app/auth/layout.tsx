import { Navbar } from "../_components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full top-sign-in flex items-center justify-center bg-[#ffffff]">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
