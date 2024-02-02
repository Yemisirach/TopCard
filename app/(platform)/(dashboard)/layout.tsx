import { DshBoardNavbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full  top-card">
      <DshBoardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
