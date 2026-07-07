"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="glass-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a company name, e.g. NVIDIA"
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" variant="gradient" size="lg" disabled={isLoading || !value.trim()}>
          {isLoading ? "Researching..." : "Analyze"}
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
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
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-40"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
