import { Logo } from "@repo/ui/components/Logo";
import { Button } from "@repo/ui/components/ui/Button";

export default function PlayerJoin() {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center font-poppins bg-primary px-4 text-secondary">
      {/* Logo */}
      <div className="font-logo font-semibold text-pink">
        <span className="text-4xl">Q</span>
        <span className="text-4xl text-secondary">uizArena</span>
      </div>

      {/* Card */}
      <div className="bg-primary-shadow rounded-xl shadow-2xl w-full max-w-sm p-6 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-semibold text-secondary text-center mb-6">
          Join Quiz Game
        </h2>

        <div className="flex flex-col gap-1 py-1 w-full">
          <label className="text-md">Name</label>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
          />
          {/* <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.email?.message} ?? ""
                </span> */}
        </div>
        <div className="flex flex-col gap-1 py-1 w-full">
          <label className="text-md">Room Pin</label>
          <input
            type="text"
            placeholder="Enter Room Pin"
            className="p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
          />
          {/* <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.email?.message}
                </span> */}
        </div>

        <Button variant="primary" onClick={() => {}}>
          Join
        </Button>
      </div>
    </div>
  );
}
