import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Salad, HeartPulse, Leaf, Users, Flame, Droplet, CalendarRange } from "lucide-react";
import Link from "next/link";
import { ProgressChart } from "@/components/progress-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto transition-colors duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent p-6 md:p-8">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
        <div className="max-w-xl space-y-2">
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Welcome back, Alex!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            &ldquo;Your body can stand almost anything. It&apos;s your mind that you have to convince.&rdquo; Keep up the great consistency this week!
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Active Streak</p>
              <h4 className="text-xl font-bold font-headline mt-0.5">5 Days</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Droplet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Hydration Level</p>
              <h4 className="text-xl font-bold font-headline mt-0.5">1.2 L</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Active Minutes</p>
              <h4 className="text-xl font-bold font-headline mt-0.5">120 min</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Workouts Done</p>
              <h4 className="text-xl font-bold font-headline mt-0.5">8 Completed</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 hover:shadow-sm transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Weekly Workout Consistency</CardTitle>
            <CardDescription>Your log counts for physical routines this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-sm transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Today&apos;s Focus</CardTitle>
            <CardDescription>Recommended plan for you today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-xl border border-border/40 hover:border-primary/20 transition-all duration-200">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">
                <Activity className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Morning Yoga Flow</h3>
                <p className="text-xs text-muted-foreground">15 min stretching routine</p>
                <Link href="/dashboard/workout" className="inline-block text-xs font-semibold text-primary hover:underline">Start now</Link>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-xl border border-border/40 hover:border-primary/20 transition-all duration-200">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">
                <Salad className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Protein-rich Lunch</h3>
                <p className="text-xs text-muted-foreground">Recommended target: 30g protein</p>
                <Link href="/dashboard/diet" className="inline-block text-xs font-semibold text-primary hover:underline">See recipes</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* bottom actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold font-headline">AI Workout Plan</CardTitle>
            <HeartPulse className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Request a customized fitness schedule from Gemini AI.</p>
            <Link href="/dashboard/workout">
              <Button className="w-full">Generate Plan <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold font-headline">AI Diet Guide</CardTitle>
            <Leaf className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Find healthy recipes and compile automated grocery orders.</p>
            <Link href="/dashboard/diet">
              <Button className="w-full">Find Recipes <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold font-headline">Explore Communities</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect with others, attend fitness events, and share routines.</p>
            <Link href="/dashboard/community">
              <Button className="w-full">Explore Groups <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
