// src/ai/flows/personalized-diet-suggestions.ts
'use server';

/**
 * @fileOverview An AI agent that provides personalized diet suggestions based on user wellness goals.
 *
 * - personalizedDietSuggestions - A function that generates diet suggestions.
 * - PersonalizedDietSuggestionsInput - The input type for the personalizedDietSuggestions function.
 * - PersonalizedDietSuggestionsOutput - The return type for the personalizedDietSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDietSuggestionsInputSchema = z.object({
  wellnessGoal: z
    .string()
    .describe(
      'The users wellness goal, such as building muscle, glowing skin, healthy aging, or managing a health condition.'
    ),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Any dietary restrictions the user has, such as vegetarian, vegan, gluten-free, etc.'),
  preferredCuisine: z
    .string()
    .optional()
    .describe('The users preferred cuisine, such as Italian, Chinese, Mexican, etc.'),
});
export type PersonalizedDietSuggestionsInput = z.infer<
  typeof PersonalizedDietSuggestionsInputSchema
>;

const PersonalizedDietSuggestionsOutputSchema = z.object({
  mealSuggestions: z
    .array(z.string())
    .describe('A list of meal suggestions that align with the users wellness goals.'),
  recipeIdeas: z
    .array(z.string())
    .describe('A list of recipe ideas that align with the users wellness goals.'),
});
export type PersonalizedDietSuggestionsOutput = z.infer<
  typeof PersonalizedDietSuggestionsOutputSchema
>;

export async function personalizedDietSuggestions(
  input: PersonalizedDietSuggestionsInput
): Promise<PersonalizedDietSuggestionsOutput> {
  return personalizedDietSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDietSuggestionsPrompt',
  input: {schema: PersonalizedDietSuggestionsInputSchema},
  output: {schema: PersonalizedDietSuggestionsOutputSchema},
  prompt: `You are a nutritionist providing personalized diet suggestions based on user wellness goals.

  The user has the following wellness goal: {{{wellnessGoal}}}

  {% if dietaryRestrictions %}The user has the following dietary restrictions: {{{dietaryRestrictions}}}{% endif %}

  {% if preferredCuisine %}The user prefers the following cuisine: {{{preferredCuisine}}}{% endif %}

You will generate a list of meal suggestions and recipe ideas that align with the users wellness goals, dietary restrictions and preferred cuisine.
`,
});

const personalizedDietSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedDietSuggestionsFlow',
    inputSchema: PersonalizedDietSuggestionsInputSchema,
    outputSchema: PersonalizedDietSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
