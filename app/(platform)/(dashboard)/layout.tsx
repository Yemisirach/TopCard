import { Navbars } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-white top-card">
      <Navbars />
      {children}
    </div>
  );
};

export default DashboardLayout;
