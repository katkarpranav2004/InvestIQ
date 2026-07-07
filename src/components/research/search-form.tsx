"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EXAMPLE_COMPANIES } from "@/lib/constants";

interface SearchFormProps {
  onSubmit: (companyName: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className="gradient-border glass-card p-7 md:p-9">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a company name, e.g. NVIDIA"
            className="h-13 pl-11 text-base"
            disabled={isLoading}
          />
        </div>
        <MagneticButton className="w-full sm:w-auto">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={isLoading || !value.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Researching..." : "Analyze"}
          </Button>
        </MagneticButton>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Try:</span>
        {EXAMPLE_COMPANIES.map((name) => (
          <button
            key={name}
            type="button"
            disabled={isLoading}
            onClick={() => {
              setValue(name);
              onSubmit(name);
            }}
            className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground disabled:opacity-40"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
