import { Logo } from "@repo/ui/components/Logo";
export default function Navbar_2() {
  return (
    <>
      <div className="bg-primary text-secondary py-2 px-3 flex justify-between items-center">
        <Logo />
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center justify-between gap-2">
            <button className="text-sm bg-secondary font-semibold text-primary hover:bg-card px-4 py-2 cursor-pointer rounded-md outline-none flex items-center gap-2">
              Create Quiz
            </button>
            <button className="text-sm font-semibold text-secondary hover:bg-primary-shadow px-4 py-2 cursor-pointer rounded-md outline-none flex items-center gap-2">
              Play Quiz
            </button>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt=""
            className="rounded-full w-10 h-10 mr-2"
          />
        </div>
      </div>
    </>
  );
}
