"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ProgressChart } from "@/components/progress-chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const pieData = [
    { name: 'Strength', value: 4, fill: 'hsl(var(--chart-1))' },
    { name: 'Cardio', value: 3, fill: 'hsl(var(--chart-2))' },
    { name: 'Yoga', value: 5, fill: 'hsl(var(--chart-3))' },
    { name: 'Stretches', value: 2, fill: 'hsl(var(--chart-4))' },
];

const chartConfig = {
    workouts: {
      label: "Workouts",
    },
    value: {
        label: "Value"
    }
  }

export function ProgressTracker() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Workout Consistency</CardTitle>
            <CardDescription>Your weekly workout performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workout Type Distribution</CardTitle>
            <CardDescription>Breakdown of your activities this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Activity Calendar</CardTitle>
            <CardDescription>Select a date to see your log.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
             <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
