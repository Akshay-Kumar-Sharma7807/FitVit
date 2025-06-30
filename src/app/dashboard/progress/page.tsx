import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <CalendarDays className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Progress Tracker</h1>
          <p className="text-muted-foreground">
            Visualize your journey, celebrate milestones, and stay consistent.
          </p>
        </div>
      </div>
      <ProgressTracker />
    </div>
  );
}
