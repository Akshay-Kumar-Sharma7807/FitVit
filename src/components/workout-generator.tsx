"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateWorkoutPlan, GenerateWorkoutPlanInput, GenerateWorkoutPlanOutput } from "@/ai/flows/ai-workout-plan-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  wellnessGoals: z.string().min(10, "Please describe your goals in more detail."),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  workoutType: z.enum(['yoga', 'stretches', 'strength training', 'cardio']),
  duration: z.coerce.number().min(5, "Duration must be at least 5 minutes.").max(120, "Duration cannot exceed 120 minutes."),
});

export function WorkoutGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<GenerateWorkoutPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wellnessGoals: "",
      fitnessLevel: "beginner",
      workoutType: "yoga",
      duration: 15,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setWorkoutPlan(null);
    try {
      const result = await generateWorkoutPlan(values as GenerateWorkoutPlanInput);
      setWorkoutPlan(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle>Create Your Plan</CardTitle>
          <CardDescription>Fill out the form to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="wellnessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wellness Goals</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., improve flexibility and reduce stress" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your fitness level" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workoutType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a workout type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="stretches">Stretches</SelectItem>
                        <SelectItem value="strength training">Strength Training</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Generate Workout</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2">
        {isLoading && (
          <div className="space-y-4">
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-28" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-28" />
                </CardContent>
            </Card>
          </div>
        )}
        {!isLoading && !workoutPlan && (
          <Card className="flex items-center justify-center h-full min-h-[400px] border-dashed">
            <div className="text-center">
              <h3 className="text-xl font-semibold">Your workout plan will appear here</h3>
              <p className="text-muted-foreground">Fill in the details on the left to generate your personalized routine.</p>
            </div>
          </Card>
        )}
        {workoutPlan && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Your Custom Workout Routine</h2>
            {workoutPlan.workoutRoutine.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{exercise.exerciseName}</CardTitle>
                  <CardDescription>{Math.round(exercise.duration / 60)} min</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{exercise.exerciseDescription}</p>
                  <a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">Watch Video</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
