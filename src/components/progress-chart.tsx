"use client"

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { ChartTooltipContent, ChartContainer, ChartConfig } from "@/components/ui/chart"

const chartData = [
  { day: "Mon", workouts: 1 },
  { day: "Tue", workouts: 1 },
  { day: "Wed", workouts: 0 },
  { day: "Thu", workouts: 2 },
  { day: "Fri", workouts: 1 },
  { day: "Sat", workouts: 0 },
  { day: "Sun", workouts: 1 },
];

const chartConfig = {
  workouts: {
    label: "Workouts",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ProgressChart() {
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
