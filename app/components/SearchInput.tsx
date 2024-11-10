import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-200" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 bg-gray-900 border-gray-800 text-white"
      />
    </div>
  );
}
