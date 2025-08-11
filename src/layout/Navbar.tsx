import { Logo } from "../components/Logo";
import { Button } from "../components/ui/Button";
export default function Navbar() {
  return (
    <>
      <div className="bg-primary font-poppins flex items-center justify-between px-5 py-3 text-secondary">
        <div className="cursor-pointer">
          <Logo />
        </div>
        <ul className="flex justify-between items-center gap-10 text-md">
          <li className="mx-2 cursor-pointer hover:text-pink-500">
            Features
          </li>
          <li className="mx-2 cursor-pointer hover:text-pink-500">About</li>
          <li className="mx-2 cursor-pointer hover:text-pink-500">
            Contacts
          </li>
        </ul>
        <div className="flex gap-4">
          <Button variant="primary">Login</Button>
          <Button variant="secondary">Signup</Button>
        </div>
      </div>
    </>
  );
}
