"use client"

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { ChartTooltipContent, ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

interface WorkoutLog {
  day: string;
  workouts: number;
}

const DEFAULT_DATA: WorkoutLog[] = [
  { day: "Mon", workouts: 0 },
  { day: "Tue", workouts: 0 },
  { day: "Wed", workouts: 0 },
  { day: "Thu", workouts: 0 },
  { day: "Fri", workouts: 0 },
  { day: "Sat", workouts: 0 },
  { day: "Sun", workouts: 0 },
];

const chartConfig = {
  workouts: {
    label: "Workouts",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

interface ProgressChartProps {
  data?: WorkoutLog[];
  loading?: boolean;
}

export function ProgressChart({ data, loading }: ProgressChartProps) {
  if (loading) {
    return <Skeleton className="min-h-[200px] w-full rounded-xl" />;
  }

  const chartData = data && data.length > 0 ? data : DEFAULT_DATA;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltipContent />
          <Bar dataKey="workouts" fill="var(--color-workouts)" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
