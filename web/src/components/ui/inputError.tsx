import { cn } from "@/lib/utils";
import * as React from "react";

const InputError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-[0.8rem] font-medium text-destructive px-3 pt-1 pb-2",
        className,
      )}
      {...props}
    />
  );
});
InputError.displayName = "InputError";

export { InputError };
