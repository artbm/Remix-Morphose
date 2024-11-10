import { Link } from "@remix-run/react";
import { Instagram, Music, Twitter } from "lucide-react";
import { Button } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white">
              FUTURE PULSE
            </Link>
            <p className="text-blue-200">Pioneering Electronic Music</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/releases" className="text-blue-200 hover:text-white">
                Latest Releases
              </Link>
              <Link to="/events" className="text-blue-200 hover:text-white">
                Events
              </Link>
              <Link to="/artists" className="text-blue-200 hover:text-white">
                Artists
              </Link>
              <Link to="/about" className="text-blue-200 hover:text-white">
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2 text-blue-200">
              <p>info@futurepulse.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Beat Street</p>
              <p>Music City, MC 12345</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-200 hover:text-white hover:bg-blue-900"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-200 hover:text-white hover:bg-blue-900"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-200 hover:text-white hover:bg-blue-900"
              >
                <Music className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} Future Pulse Records. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
