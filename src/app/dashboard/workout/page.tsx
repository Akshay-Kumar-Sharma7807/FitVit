import { WorkoutGenerator } from "@/components/workout-generator";
import { HeartPulse } from "lucide-react";

export default function WorkoutPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <HeartPulse className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Workout Plan Generator</h1>
          <p className="text-muted-foreground">
            Describe your goals and let our AI create the perfect workout routine for you.
          </p>
        </div>
      </div>
      <WorkoutGenerator />
    </div>
  );
}
