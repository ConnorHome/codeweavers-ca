import { cn } from "../utils/styling";

export function Select({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <select
      className={cn(
        "border rounded-md border-slate-200 px-2 py-1.5 shadow",
        className
      )}
      {...rest}
    />
  );
}
