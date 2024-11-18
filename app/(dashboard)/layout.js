import Sidebar from "@/components/Sidebar";

export default function DashboardGroupLayout({ children }) {
  return (
    <div className="dashboard-group-layout">
      <Sidebar />
      <main className="ml-[250px]">{children}</main>
    </div>
  );
}
