import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";

interface NavLinksProps {
  mobile?: boolean;
}

export function NavLinks({ mobile }: NavLinksProps) {
  const location = useLocation();

  const links = [
    { href: "/releases", label: "Releases" },
    { href: "/artists", label: "Artists" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
  ];

  return (
    <div
      className={cn(
        "flex",
        mobile ? "flex-col space-y-4" : "items-center space-x-6"
      )}
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "text-sm transition-colors",
            mobile ? "text-lg py-2" : "",
            location.pathname.startsWith(href)
              ? "text-white font-medium"
              : "text-blue-200 hover:text-white"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
