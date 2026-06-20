"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ArrowRight, Bot, HeartPulse, Leaf, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden transition-colors duration-300">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-gradient-to-tl from-accent/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
            <span className="text-2xl font-bold font-headline tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FitVit</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm" className="hidden sm:inline-flex shadow-sm hover:scale-105 transition-all">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-medium mb-6 transition-all hover:bg-secondary/80">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-muted-foreground">Powered by Google Gemini & Genkit</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-headline tracking-tight text-foreground leading-[1.1] transition-all">
              Your Personal <span className="bg-gradient-to-r from-primary via-orange-500 to-accent bg-clip-text text-transparent">AI Wellness</span> Companion
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg leading-relaxed">
              Achieve your fitness goals with bespoke diet guides, AI-generated workouts, and automated shopping lists. Built to optimize your healthy lifestyle.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-105 transition-all">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 transition-all hover:bg-secondary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card/40 border-y border-border/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">
                Intelligent Features to Empower You
              </h2>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base">
                FitVit combines state-of-the-art AI agents to simplify your meal plans, schedules, and consistency.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              <div className="flex flex-col p-8 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all hover:-translate-y-1 group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold font-headline">AI-Powered Diet Guide</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Bespoke meal suggestions and curated recipe guides tailored to your wellness targets, macro needs, and restrictions.
                </p>
              </div>
              <div className="flex flex-col p-8 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all hover:-translate-y-1 group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold font-headline">Smart Workout Generator</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Tailored yoga, stretches, and intensity routines with video guides, designed around your physical level and schedule.
                </p>
              </div>
              <div className="flex flex-col p-8 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all hover:-translate-y-1 group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold font-headline">Agentic AI Shopping</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Let AI agents analyze your weekly meals to compile categorized supplement recommendations and grocery shopping lists automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">
                How FitVit Works
              </h2>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base">
                Getting started is simple. Achieve a healthier lifestyle in three quick steps.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto relative">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-6 shadow-md shadow-primary/20 transition-transform hover:scale-110">
                  1
                </div>
                <h3 className="text-lg font-semibold font-headline">Define Intentions</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Input your personal targets, lifestyle constraints, or dietary preferences into your profile.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-6 shadow-md shadow-primary/20 transition-transform hover:scale-110">
                  2
                </div>
                <h3 className="text-lg font-semibold font-headline">Generate Custom Plans</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Our Google Gemini AI workflows craft unique diet plans and routines suited for you instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-6 shadow-md shadow-primary/20 transition-transform hover:scale-110">
                  3
                </div>
                <h3 className="text-lg font-semibold font-headline">Track Consistency</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Log your workouts, review statistics, and monitor your monthly progress on the calendar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/30 border-y border-border/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">
                What Our Users Say
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;The AI workout generator is fantastic! It customizes stretches for me when I spend too much time coding at my desk. FitVit is a lifesaver.&rdquo;
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">AD</div>
                  <div>
                    <h4 className="text-sm font-semibold">Alex Doe</h4>
                    <p className="text-xs text-muted-foreground">Student Developer</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;Having my grocery and supplement lists compiled automatically has saved me hours of weekly prep. Highly recommended!&rdquo;
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">SM</div>
                  <div>
                    <h4 className="text-sm font-semibold">Sarah Miller</h4>
                    <p className="text-xs text-muted-foreground">Fitness Enthusiast</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;The clean UI and focus on wellness instead of just calorie counting is refreshing. Dark mode is also very sleek.&rdquo;
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">JW</div>
                  <div>
                    <h4 className="text-sm font-semibold">James White</h4>
                    <p className="text-xs text-muted-foreground">Research Scholar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border/60 rounded-xl px-4 bg-card/60 transition-all hover:border-primary/30">
              <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary py-4 transition-all">How customized are the diet plans?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed text-sm">
                Each plan is generated dynamically by Google Gemini using structured schemas. They incorporate your wellness goals, allergies, cuisine preferences, and restrictions to give practical recipe ideas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border/60 rounded-xl px-4 bg-card/60 transition-all hover:border-primary/30">
              <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary py-4 transition-all">Is FitVit free to use?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed text-sm">
                Yes! FitVit is currently open to developers and users for testing. Simply set up your local API keys to begin generating plans.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border/60 rounded-xl px-4 bg-card/60 transition-all hover:border-primary/30">
              <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary py-4 transition-all">How does the Smart Shopping list work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed text-sm">
                Our agent reads your active diet plan, determines the necessary groceries and supplements, and organizes them into a checklist.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground leading-tight">
              Ready to Upgrade Your Well-being?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Start building routines today. It takes less than a minute to create your first customized plan.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button size="lg" className="px-10 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all">
                  Get Started For Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {date ? date.getFullYear() : '2026'} FitVit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
