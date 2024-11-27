import NavigationSidebar from "@/components/Sidebar";

export default function DashboardGroupLayout({ children }) {
  return (
    <div className="dashboard-group-layout">
      <NavigationSidebar />
      <main className="ml-[250px]">{children}</main>
    </div>
  );
}
