import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  tint?: "primary" | "accent" | "secondary";
}

const TINT_CLASSES: Record<NonNullable<SectionCardProps["tint"]>, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/10 text-secondary",
};

export function SectionCard({ icon: Icon, title, children, tint = "primary" }: SectionCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${TINT_CLASSES[tint]}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</CardContent>
    </Card>
  );
}
