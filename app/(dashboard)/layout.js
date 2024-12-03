import NavigationSidebar from "@/components/navigationSidebar";

export default function DashboardGroupLayout({ children }) {
  return (
    <div className="dashboard-group-layout">
      <NavigationSidebar />
      <main className="ml-[250px]">{children}</main>
    </div>
  );
}
