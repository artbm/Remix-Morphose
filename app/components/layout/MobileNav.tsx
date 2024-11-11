import { Play } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { NavLinks } from "./NavLinks";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-full max-w-md bg-gray-950 border-gray-800 p-0"
      >
        <SheetHeader className="p-6 border-b border-gray-800">
          <SheetTitle className="text-white">Morphose</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="flex flex-col p-6">
            <NavLinks mobile />
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
              <Play className="w-4 h-4 mr-2" />
              Listen Now
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
