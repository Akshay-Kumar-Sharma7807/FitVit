'use server';

/**
 * @fileOverview Automated Supplement Ordering flow that suggests and orders supplements and groceries based on the user's diet plan.
 *
 * - automatedSupplementOrdering - A function that handles the supplement ordering process.
 * - AutomatedSupplementOrderingInput - The input type for the automatedSupplementOrdering function.
 * - AutomatedSupplementOrderingOutput - The return type for the automatedSupplementOrdering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedSupplementOrderingInputSchema = z.object({
  dietPlan: z
    .string()
    .describe("The user's diet plan, including meals and nutritional goals."),
  userPreferences: z
    .string()
    .describe("The user's preferences regarding supplements and groceries, including brands, allergies, and budget."),
});
export type AutomatedSupplementOrderingInput = z.infer<typeof AutomatedSupplementOrderingInputSchema>;

const AutomatedSupplementOrderingOutputSchema = z.object({
  suggestedSupplements: z
    .array(z.string())
    .describe('A list of suggested supplements based on the diet plan and user preferences.'),
  suggestedGroceries: z
    .array(z.string())
    .describe('A list of suggested groceries based on the diet plan and user preferences.'),
  orderSummary: z
    .string()
    .describe('A summary of the order, including the total cost and shipping information.'),
});
export type AutomatedSupplementOrderingOutput = z.infer<typeof AutomatedSupplementOrderingOutputSchema>;

export async function automatedSupplementOrdering(input: AutomatedSupplementOrderingInput): Promise<AutomatedSupplementOrderingOutput> {
  return automatedSupplementOrderingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedSupplementOrderingPrompt',
  input: {schema: AutomatedSupplementOrderingInputSchema},
  output: {schema: AutomatedSupplementOrderingOutputSchema},
  prompt: `Based on the user's diet plan and preferences, suggest supplements and groceries to order from online retailers.

Diet Plan: {{{dietPlan}}}
User Preferences: {{{userPreferences}}}

Output the suggested supplements, suggested groceries, and a summary of the order.

Consider the following:
- The user's dietary goals and restrictions.
- The user's preferences for brands and types of supplements and groceries.
- The user's budget.

Return the results in the following JSON format:
{
  "suggestedSupplements": ["Supplement 1", "Supplement 2"],
  "suggestedGroceries": ["Grocery 1", "Grocery 2"],
  "orderSummary": "Order summary"
}`,
});

const automatedSupplementOrderingFlow = ai.defineFlow(
  {
    name: 'automatedSupplementOrderingFlow',
    inputSchema: AutomatedSupplementOrderingInputSchema,
    outputSchema: AutomatedSupplementOrderingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
