import { cn } from "../utils/styling";

export function Input({
  type = "text",
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "border rounded-md border-slate-200 px-2 py-1.5 shadow",
        className
      )}
      {...rest}
    />
  );
}
