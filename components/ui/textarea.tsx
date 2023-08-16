import { forwardRef, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const defaultClasses = `flex
min-h-[80px]
max-h-[250px]
w-full
rounded-md
border
border-input
bg-background
px-3
py-1
text-sm
shadow-sm
transition
placeholder:text-muted-foreground
focus-visible:outline-none
focus-visible:ring-1
focus-visible:ring-ring
disabled:cursor-not-allowed
disabled:opacity-50`;

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(defaultClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
