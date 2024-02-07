import { DashBoardNavbar } from "./_components/navbar";

const DashboardLayout = ({ 
  children
}: { 
  children: React.ReactNode;
 }) => {
  return (
    <div className="h-full top-card">
      <DashBoardNavbar />
      {children}
    </div>
  );
 };

 export default DashboardLayout;
