import { cn } from "@/lib/utils";

interface TagProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export function Tag({ variant = "neutral", children, className }: TagProps) {
  return (
    <span
      className={cn(
        "status-badge",
        variant === "success" && "status-success",
        variant === "warning" && "status-warning",
        variant === "danger" && "status-danger",
        variant === "info" && "status-info",
        variant === "neutral" && "status-neutral",
        className
      )}
    >
      {children}
    </span>
  );
}
