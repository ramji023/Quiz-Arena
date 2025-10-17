import { Logo } from "@repo/ui/components/Logo";
import { Button } from "@repo/ui/components/ui/Button";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()
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
          <Button variant="primary" onClick={()=>navigate("/auth/login")}>Login</Button>
          <Button variant="secondary" onClick={()=>navigate("/auth/signup")} >Signup</Button>
        </div>
      </div>
    </>
  );
}
