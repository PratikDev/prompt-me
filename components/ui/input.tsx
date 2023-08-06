import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

const defaultClasses = `flex
  h-10
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
  file:border-0
  file:bg-transparent
  file:text-sm
  file:font-medium
  placeholder:text-muted-foreground
  focus-visible:outline-none
  focus-visible:ring-1
  focus-visible:ring-ring
  disabled:cursor-not-allowed
  disabled:opacity-50`;

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(defaultClasses, className)}
    ref={ref}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
