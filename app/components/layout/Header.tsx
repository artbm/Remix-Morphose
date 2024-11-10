import { Link } from "@remix-run/react";
import { Menu, Play } from "lucide-react";
import { Button } from "~/components/ui/button"; // Adjust the import path as necessary
import { NavLinks } from "./NavLinks";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            FUTURE PULSE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Listen Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
