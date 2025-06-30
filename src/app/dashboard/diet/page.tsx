import { DietGuide } from "@/components/diet-guide";
import { Leaf } from "lucide-react";

export default function DietPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Leaf className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Diet Guide & Smart Shopping</h1>
          <p className="text-muted-foreground">
            Fuel your body right with personalized diet suggestions and automated shopping lists.
          </p>
        </div>
      </div>
      <DietGuide />
    </div>
  );
}
