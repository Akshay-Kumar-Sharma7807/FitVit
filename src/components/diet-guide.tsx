"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalizedDietSuggestions, PersonalizedDietSuggestionsOutput } from "@/ai/flows/personalized-diet-suggestions";
import { automatedSupplementOrdering, AutomatedSupplementOrderingOutput } from "@/ai/flows/automated-supplement-ordering";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const dietFormSchema = z.object({
  wellnessGoal: z.string().min(5, "Please be more specific about your goal."),
  dietaryRestrictions: z.string().optional(),
  preferredCuisine: z.string().optional(),
});

const shoppingFormSchema = z.object({
  dietPlan: z.string().min(20, "Please provide a more detailed diet plan."),
  userPreferences: z.string().min(10, "Please describe your preferences."),
});

export function DietGuide() {
  const { toast } = useToast();
  
  const [isDietLoading, setIsDietLoading] = useState(false);
  const [dietSuggestions, setDietSuggestions] = useState<PersonalizedDietSuggestionsOutput | null>(null);
  
  const [isShoppingLoading, setIsShoppingLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState<AutomatedSupplementOrderingOutput | null>(null);

  const dietForm = useForm<z.infer<typeof dietFormSchema>>({
    resolver: zodResolver(dietFormSchema),
    defaultValues: { wellnessGoal: "", dietaryRestrictions: "", preferredCuisine: "" },
  });

  const shoppingForm = useForm<z.infer<typeof shoppingFormSchema>>({
    resolver: zodResolver(shoppingFormSchema),
    defaultValues: { dietPlan: "", userPreferences: "" },
  });

  async function onDietSubmit(values: z.infer<typeof dietFormSchema>) {
    setIsDietLoading(true);
    setDietSuggestions(null);
    try {
      const result = await personalizedDietSuggestions(values);
      setDietSuggestions(result);
      const planText = `Meal Suggestions:\n- ${result.mealSuggestions.join('\n- ')}\n\nRecipe Ideas:\n- ${result.recipeIdeas.join('\n- ')}`;
      shoppingForm.setValue('dietPlan', planText);
    } catch (error) {
      toast({ title: "Error", description: "Failed to get diet suggestions.", variant: "destructive" });
    } finally {
      setIsDietLoading(false);
    }
  }

  async function onShoppingSubmit(values: z.infer<typeof shoppingFormSchema>) {
    setIsShoppingLoading(true);
    setShoppingList(null);
    try {
      const result = await automatedSupplementOrdering(values);
      setShoppingList(result);
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate shopping list.", variant: "destructive" });
    } finally {
      setIsShoppingLoading(false);
    }
  }

  return (
    <Tabs defaultValue="diet" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="diet"><UtensilsCrossed className="mr-2 h-4 w-4" /> Diet Suggestions</TabsTrigger>
        <TabsTrigger value="shopping"><ShoppingCart className="mr-2 h-4 w-4" /> Smart Shopping</TabsTrigger>
      </TabsList>
      <TabsContent value="diet">
        <Card>
          <CardHeader>
            <CardTitle>Personalized Diet Guide</CardTitle>
            <CardDescription>Get meal and recipe ideas tailored to your wellness goals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...dietForm}>
              <form onSubmit={dietForm.handleSubmit(onDietSubmit)} className="space-y-4">
                <FormField control={dietForm.control} name="wellnessGoal" render={({ field }) => (
                  <FormItem><FormLabel>Primary Wellness Goal</FormLabel><FormControl><Input placeholder="e.g., Build muscle, glowing skin" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={dietForm.control} name="dietaryRestrictions" render={({ field }) => (
                    <FormItem><FormLabel>Dietary Restrictions (optional)</FormLabel><FormControl><Input placeholder="e.g., Vegetarian, gluten-free" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={dietForm.control} name="preferredCuisine" render={({ field }) => (
                    <FormItem><FormLabel>Preferred Cuisine (optional)</FormLabel><FormControl><Input placeholder="e.g., Italian, Mexican" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Button type="submit" disabled={isDietLoading} className="w-full sm:w-auto shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-102 transition-all">
                  {isDietLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...</> : <><Sparkles className="mr-2 h-4 w-4" /> Get Suggestions</>}
                </Button>
              </form>
            </Form>
            {isDietLoading && <div className="grid md:grid-cols-2 gap-6 pt-6"><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /></div>}
            {dietSuggestions && (
              <div className="pt-6 grid md:grid-cols-2 gap-6 border-t border-border/40">
                <div className="p-4 bg-secondary/35 rounded-xl border border-border/40">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Meal Suggestions</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">{dietSuggestions.mealSuggestions.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div className="p-4 bg-secondary/35 rounded-xl border border-border/40">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Recipe Ideas</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">{dietSuggestions.recipeIdeas.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="shopping">
        <Card>
          <CardHeader>
            <CardTitle>Automated Shopping List</CardTitle>
            <CardDescription>Generate a shopping list for supplements and groceries based on your diet plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...shoppingForm}>
              <form onSubmit={shoppingForm.handleSubmit(onShoppingSubmit)} className="space-y-4">
                <FormField control={shoppingForm.control} name="dietPlan" render={({ field }) => (
                  <FormItem><FormLabel>Your Diet Plan</FormLabel><FormControl><Textarea rows={8} className="resize-none" placeholder="Paste your diet plan or generate one from the 'Diet Suggestions' tab." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={shoppingForm.control} name="userPreferences" render={({ field }) => (
                  <FormItem><FormLabel>Shopping Preferences</FormLabel><FormControl><Textarea rows={4} className="resize-none" placeholder="e.g., Organic only, budget of $100/week, prefer Whole Foods." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isShoppingLoading} className="w-full sm:w-auto shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-102 transition-all">
                  {isShoppingLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating List...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Shopping List</>}
                </Button>
              </form>
            </Form>
            {isShoppingLoading && <div className="space-y-4 pt-6"><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-16 rounded-xl" /></div>}
            {shoppingList && (
              <div className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Suggested Supplements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">{shoppingList.suggestedSupplements.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                 <div>
                  <h3 className="font-semibold text-lg mb-2">Suggested Groceries</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">{shoppingList.suggestedGroceries.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{shoppingList.orderSummary}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
