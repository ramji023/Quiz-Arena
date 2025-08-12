import { LayoutDashboard, ListChecks, Package, Ellipsis } from "lucide-react";
import { div } from "motion/react-client";

const SidebarIcons = [
  {
    item: "Home",
    icon: LayoutDashboard,
  },
  {
    item: "Quizzes",
    icon: ListChecks,
  },
  {
    item: "Saved",
    icon: Package,
  },
  {
    item: "History",
    icon: Ellipsis,
  },
];
export default function SidebarItems({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      {!collapsed ? (
        <>
          {SidebarIcons.map((items, index) => (
            <div key={index}>
              <div className="flex items-center justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
                <items.icon className="w-6 h-6" />
                <span className="text-lg px-5">{items.item}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {SidebarIcons.map((items, index) => (
            <div key={index}>
              <div className="flex items-center justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
                <items.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
