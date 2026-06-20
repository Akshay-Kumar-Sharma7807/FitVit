"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, HeartPulse, Leaf, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden transition-colors duration-300">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[50%] rounded-full bg-gradient-to-tr from-accent/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
            <span className="text-2xl font-bold font-headline tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FitVit</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        {/* Mission Section */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Our Mission: Wellness Made Simple
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            At FitVit, we believe that achieving your wellness goals should be an empowering and personalized journey. Our platform is designed to remove the guesswork from health and fitness, providing you with AI-driven tools that adapt to your unique needs, preferences, and lifestyle.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="py-12 border-t border-border/40">
          <h2 className="text-3xl font-bold text-center font-headline text-foreground mb-12">What We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader className="items-center pb-2">
                <Leaf className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-headline mt-3">AI Diet Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm leading-relaxed">
                Receive meal suggestions and recipes tailored to your goals, whether it&apos;s building muscle, improving skin health, or managing dietary restrictions.
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader className="items-center pb-2">
                <HeartPulse className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-headline mt-3">Workout Generator</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm leading-relaxed">
                Get customized workout plans, including yoga, strength training, and cardio, complete with video guides to ensure proper form.
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader className="items-center pb-2">
                <Users className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-headline mt-3">Community Hub</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm leading-relaxed">
                Connect with like-minded individuals, join fitness challenges, and participate in healthy cooking workshops to stay motivated.
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader className="items-center pb-2">
                <Bot className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-headline mt-3">Smart Assistants</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-sm leading-relaxed">
                Let our AI agents help you by automating supplement orders from your diet plan and suggesting relevant classes to join.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 border-t border-border/40">
          <h2 className="text-3xl font-bold text-center font-headline text-foreground mb-12">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold font-headline">Personalization First</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  We believe that health is not one-size-fits-all. Every routine we produce is fully customized to your specific lifestyle, preferences, and goals.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold font-headline">Empowered by AI</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  By utilizing state-of-the-art models like Google Gemini, we provide dynamic, contextual, and intelligent wellness planning in seconds.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold font-headline">Community Integration</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Consistency is built on connection. We make it easy to find fitness challenges, cooking groups, and yoga clubs that share your ambitions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold font-headline">Science & Safety</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Our workouts and nutrition guidelines are designed to focus on sustainable, safe practices, with video walk-throughs to guide you along the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        <section className="py-20 border-t border-border/40">
          <h2 className="text-3xl font-bold text-center font-headline text-foreground mb-12">The FitVit Journey</h2>
          <div className="relative border-l border-border/80 max-w-2xl mx-auto pl-6 space-y-10">
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />
              <h4 className="text-lg font-semibold font-headline text-primary">Phase 1: Concept & Conception</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                FitVit started with a simple idea: how can we make fitness planning painless for busy students? We designed the prototype focusing on yoga and dietary personalization.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />
              <h4 className="text-lg font-semibold font-headline text-primary">Phase 2: Intelligent Workflows</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We integrated Google Gemini using Firebase Genkit to create structured schemas. This allowed the AI to reliably output tailored recipes, supplement checks, and workout schedules.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />
              <h4 className="text-lg font-semibold font-headline text-primary">Phase 3: Dark Mode & Premium UI</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Listening to user feedback, we rebranded to FitVit, deployed a beautiful dark mode framework, built out custom calendars, and revamped the user dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Showcase */}
        <section className="py-20 border-t border-border/40 text-center">
          <h2 className="text-3xl font-bold font-headline text-foreground mb-12">Developed With Passion</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center font-bold text-white text-3xl shadow-md">
              FV
            </div>
            <h3 className="mt-4 text-xl font-semibold font-headline">The FitVit Team</h3>
            <p className="mt-1 text-sm text-muted-foreground">Wellness Developers & Researchers</p>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              We are dedicated to building free, beautiful, and accessible wellness technologies. By leveraging generative AI, we bridge the gap between expensive personal trainers and your health goals.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-secondary/40 py-16 px-6 rounded-2xl border border-border/60">
          <h2 className="text-3xl font-bold font-headline text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground">
            Join FitVit today and take the first step towards a healthier, more balanced life.
          </p>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="hover:scale-105 transition-all shadow-md">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t border-border/20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {date ? date.getFullYear() : '2026'} FitVit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
