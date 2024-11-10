import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-black">
      <Header onMenuClick={() => setIsMobileNavOpen(true)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
