// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview An AI tool to suggest and display tailored short workout video routines, including yoga or stretches, based on user wellness goals and fitness level.
 *
 * - generateWorkoutPlan - A function that handles the workout plan generation process.
 * - GenerateWorkoutPlanInput - The input type for the generateWorkoutPlan function.
 * - GenerateWorkoutPlanOutput - The return type for the generateWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorkoutPlanInputSchema = z.object({
  wellnessGoals: z.string().describe('The user wellness goals.'),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The user fitness level.'),
  workoutType: z.enum(['yoga', 'stretches', 'strength training', 'cardio']).describe('The type of workout the user prefers.'),
  duration: z.number().describe('The desired duration of the workout in minutes.'),
});
export type GenerateWorkoutPlanInput = z.infer<typeof GenerateWorkoutPlanInputSchema>;

const GenerateWorkoutPlanOutputSchema = z.object({
  workoutRoutine: z.array(
    z.object({
      exerciseName: z.string().describe('The name of the exercise.'),
      exerciseDescription: z.string().describe('The description of the exercise.'),
      videoUrl: z.string().url().describe('The URL of the video demonstrating the exercise.'),
      duration: z.number().describe('The duration of the exercise in seconds.'),
    })
  ).describe('The generated workout routine.'),
});
export type GenerateWorkoutPlanOutput = z.infer<typeof GenerateWorkoutPlanOutputSchema>;

export async function generateWorkoutPlan(input: GenerateWorkoutPlanInput): Promise<GenerateWorkoutPlanOutput> {
  return generateWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWorkoutPlanPrompt',
  input: {schema: GenerateWorkoutPlanInputSchema},
  output: {schema: GenerateWorkoutPlanOutputSchema},
  prompt: `You are an expert AI workout plan generator.

You will generate a workout plan based on the user's wellness goals, fitness level, workout type, and desired duration. Provide direct URLs to publically available workout videos. You are an expert on providing accurate workout instructions.

Wellness Goals: {{{wellnessGoals}}}
Fitness Level: {{{fitnessLevel}}}
Workout Type: {{{workoutType}}}
Duration: {{{duration}}} minutes

Generate a workout routine consisting of exercises that are safe and appropriate for the user's fitness level and wellness goals.The workout routine should align with the specified workout type and fit within the desired duration.
`, 
});

const generateWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generateWorkoutPlanFlow',
    inputSchema: GenerateWorkoutPlanInputSchema,
    outputSchema: GenerateWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
