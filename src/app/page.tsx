"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, HeartPulse, Leaf } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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
      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
              Your Personal AI Wellness Companion
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Achieve your health goals with personalized diet plans, AI-generated workouts, and mindful support. Built for students, by students.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Start Your Wellness Journey <ArrowRight className="ml-2 h-5 w-5" /></Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center font-headline text-foreground">Features to Empower You</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <Leaf className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold font-headline">AI-Powered Diet Guide</h3>
                <p className="mt-2 text-muted-foreground">Customized meal suggestions and recipes based on your unique wellness goals.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <HeartPulse className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Smart Workout Generator</h3>
                <p className="mt-2 text-muted-foreground">Tailored workout and stretch routines with video guides to fit your fitness level.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <Bot className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Agentic AI Assistants</h3>
                <p className="mt-2 text-muted-foreground">Automate supplement orders and get recommendations for classes and communities.</p>
              </div>
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
