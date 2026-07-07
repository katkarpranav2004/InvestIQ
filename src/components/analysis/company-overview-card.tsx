import { Building2, Calendar, MapPin, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CompanyOverview } from "@/types";

export function CompanyOverviewCard({ overview }: { overview: CompanyOverview }) {
  const facts = [
    { icon: Calendar, label: "Founded", value: overview.founded },
    { icon: MapPin, label: "Headquarters", value: overview.headquarters },
    { icon: User, label: "CEO", value: overview.ceo },
    { icon: Building2, label: "Industry", value: overview.industry },
  ];

  return (
    <Card>
      <CardContent className="pt-7">
        <p className="text-sm leading-relaxed text-muted-foreground">{overview.summary}</p>
        <div className="mt-6 grid grid-cols-2 gap-5 border-t border-white/[0.06] pt-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <fact.icon className="h-3.5 w-3.5" />
                {fact.label}
              </span>
              <span className="text-sm font-medium text-foreground">{fact.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
