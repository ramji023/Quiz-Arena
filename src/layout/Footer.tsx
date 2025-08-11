import { Logo } from "../components/Logo";
import {
  InstaIcon,
  FacebookIcon,
  TwitterIcon,
} from "../components/icons/SocialIcons";
export default function Footer() {
  return (
    <footer className="bg-primary text-white font-poppins px-5 py-3">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-gray-400 max-w-sm">
              Challenge your mind, compete with friends, and discover new
              knowledge every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-pink-500 cursor-pointer">Features</li>
              <li className="hover:text-pink-500 cursor-pointer">About</li>
              <li className="hover:text-pink-500 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 ">
              <div className="bg-pink rounded-full p-1">
                <FacebookIcon />
              </div>
              <div className="bg-pink rounded-full p-1">
                <TwitterIcon />
              </div>
              <div className="bg-pink rounded-full p-1">
                <InstaIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} QuizArena. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
