"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Flame, Activity, Dumbbell, Loader2, CheckCircle, XCircle } from "lucide-react";

interface Props {
  stats?: {
    streak: number;
    hydrationLiters: number;
    activeMinutes: number;
    workoutsCompleted: number;
  };
  onUpdate: () => Promise<void>;
}

type FeedbackState = { type: "success" | "error"; message: string } | null;

export function StatsUpdater({ stats, onUpdate }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const patch = async (key: string, value: number, label: string) => {
    setLoading(label);
    setFeedback(null);
    try {
      const res = await fetch("/api/user/stats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showFeedback("error", err?.error ?? "Failed to update. Please try again.");
        return;
      }

      await onUpdate();
      showFeedback("success", "Stats updated!");
    } catch {
      showFeedback("error", "Network error. Check your connection.");
    } finally {
      setLoading(null);
    }
  };

  const actions = [
    {
      label: "Log Workout",
      icon: <Dumbbell className="h-4 w-4" />,
      onClick: () =>
        patch("workoutsCompleted", (stats?.workoutsCompleted ?? 0) + 1, "workout"),
      id: "workout",
    },
    {
      label: "+0.5L Water",
      icon: <Droplet className="h-4 w-4" />,
      onClick: () =>
        patch(
          "hydrationLiters",
          Math.round(((stats?.hydrationLiters ?? 0) + 0.5) * 10) / 10,
          "water"
        ),
      id: "water",
    },
    {
      label: "+15 min Active",
      icon: <Activity className="h-4 w-4" />,
      onClick: () =>
        patch("activeMinutes", (stats?.activeMinutes ?? 0) + 15, "active"),
      id: "active",
    },
    {
      label: "+1 Day Streak",
      icon: <Flame className="h-4 w-4" />,
      onClick: () => patch("streak", (stats?.streak ?? 0) + 1, "streak"),
      id: "streak",
    },
  ];

  return (
    <Card className="hover:shadow-sm transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Log Today&apos;s Activity</CardTitle>
        <CardDescription>Tap to update your stats — saved instantly to MongoDB.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="flex items-center gap-2 justify-start hover:border-primary/40 hover:bg-primary/5 transition-all"
              onClick={action.onClick}
              disabled={loading !== null}
            >
              {loading === action.id ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <span className="text-primary">{action.icon}</span>
              )}
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0" />
            )}
            {feedback.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
