"use client";

import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
            <span className="text-2xl font-bold font-headline text-primary">WellGenius</span>
          </Link>
          <nav className="flex items-center space-x-4">
             <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Our Mission: Wellness Made Simple
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            At WellGenius, we believe that achieving your wellness goals should be an empowering and personalized journey. Our platform is designed to remove the guesswork from health and fitness, providing you with AI-driven tools that adapt to your unique needs, preferences, and lifestyle.
          </p>
        </section>

        <section className="py-16">
            <h2 className="text-3xl font-bold text-center font-headline text-foreground">What We Offer</h2>
             <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="items-center">
                    <Leaf className="h-10 w-10 text-primary" />
                    <CardTitle className="text-xl font-headline mt-2">AI Diet Guide</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                    Receive meal suggestions and recipes tailored to your goals, whether it's building muscle, improving skin health, or managing dietary restrictions.
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="items-center">
                    <HeartPulse className="h-10 w-10 text-primary" />
                    <CardTitle className="text-xl font-headline mt-2">Workout Generator</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                    Get customized workout plans, including yoga, strength training, and cardio, complete with video guides to ensure proper form.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                    <Users className="h-10 w-10 text-primary" />
                    <CardTitle className="text-xl font-headline mt-2">Community Hub</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                    Connect with like-minded individuals, join fitness challenges, and participate in healthy cooking workshops to stay motivated.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                    <Bot className="h-10 w-10 text-primary" />
                    <CardTitle className="text-xl font-headline mt-2">Smart Assistants</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                    Let our AI agents help you by automating supplement orders from your diet plan and suggesting relevant classes to join.
                </CardContent>
              </Card>
            </div>
        </section>

         <section className="text-center bg-secondary py-16 rounded-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-headline text-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Join WellGenius today and take the first step towards a healthier, more balanced life.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started for Free <ArrowRight className="ml-2 h-5 w-5" /></Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {date ? date.getFullYear() : '2024'} WellGenius. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
