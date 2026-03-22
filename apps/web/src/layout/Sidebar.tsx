import SidebarItems from "./SidebarItems";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <div className={`flex-1`}>
      <SidebarItems collapsed={collapsed} />
    </div>
    </>
  );
}
