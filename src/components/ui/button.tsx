import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_rgb(255_255_255_/_0.25)_inset] hover:-translate-y-0.5 hover:shadow-glow",
        gradient:
          "text-background bg-gradient-to-r from-[#f4e4b8] via-primary to-[#b8860b] bg-[length:200%_auto] shadow-glow hover:-translate-y-0.5 hover:bg-[position:100%_0] hover:shadow-glow-lg",
        accent:
          "bg-accent text-background shadow-[0_1px_0_0_rgb(255_255_255_/_0.25)_inset] hover:-translate-y-0.5 hover:shadow-glow-accent",
        outline:
          "border border-white/10 bg-white/[0.02] text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.05]",
        ghost: "hover:bg-white/[0.05] hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-foreground hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-13 rounded-2xl px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
