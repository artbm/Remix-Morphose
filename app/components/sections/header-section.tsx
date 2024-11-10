import { cn } from "~/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        {description && <p className="text-sm text-blue-200">{description}</p>}
      </div>
      {children && (
        <div className="flex flex-col md:flex-row gap-4">{children}</div>
      )}
    </div>
  );
}
