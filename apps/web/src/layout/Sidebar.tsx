import SidebarItems from "./SidebarItems";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <div className="flex flex-col justify-between h-full">
      <SidebarItems collapsed={collapsed} />
    </div>
    </>
  );
}
