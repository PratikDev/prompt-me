import { cn } from "@/lib/utils";
import { forwardRef, LabelHTMLAttributes } from "react";

const defaultClasses =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(defaultClasses, className)} {...props} />
));

Label.displayName = "Label";

export { Label };
