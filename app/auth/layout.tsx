import { Navbar } from "../_components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-[800px] top-sign-in flex items-center justify-center bg-[#ffffff]">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
