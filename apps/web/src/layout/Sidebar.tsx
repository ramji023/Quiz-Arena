import SidebarItems from "@repo/ui/components/ui/SidebarItems";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <div className="flex flex-col"><SidebarItems collapsed={collapsed}/></div>
    </>
  );
}
