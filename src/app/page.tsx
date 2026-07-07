import { Hero } from "@/components/home/hero";
import { FeatureGrid } from "@/components/home/feature-grid";
import { WorkflowStrip } from "@/components/home/workflow-strip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <WorkflowStrip />
    </>
  );
}
