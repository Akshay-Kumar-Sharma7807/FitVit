import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Salad, HeartPulse, Leaf, Users } from "lucide-react";
import Link from "next/link";
import { ProgressChart } from "@/components/progress-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your wellness overview.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your workout and diet consistency this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today's Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Morning Yoga</h3>
                <p className="text-sm text-muted-foreground">15 min session</p>
                <Link href="/dashboard/workout" className="text-sm text-accent hover:underline">Start now</Link>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-2 rounded-full">
                <Salad className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Protein-rich Lunch</h3>
                <p className="text-sm text-muted-foreground">Goal: 30g protein</p>
                <Link href="/dashboard/diet" className="text-sm text-accent hover:underline">See suggestions</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">AI Workout Plan</CardTitle>
            <HeartPulse className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Get a workout plan tailored to your goals.</p>
            <Link href="/dashboard/workout">
              <Button className="w-full">Generate Plan <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">AI Diet Guide</CardTitle>
            <Leaf className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Discover meals for your wellness journey.</p>
            <Link href="/dashboard/diet">
              <Button className="w-full">Find Recipes <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Community</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect with peers and join wellness groups.</p>
            <Link href="/dashboard/community">
              <Button className="w-full">Explore Groups <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
