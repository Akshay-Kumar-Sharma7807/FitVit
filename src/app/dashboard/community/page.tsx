import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Users } from "lucide-react";

const communities = [
  {
    title: "Sunrise Yoga Club",
    description: "Join our daily morning yoga sessions to start your day with energy and peace. All levels welcome.",
    image: "https://placehold.co/600x400.png",
    aiHint: "yoga class"
  },
  {
    title: "Mindful Meditation Group",
    description: "A community for practicing mindfulness and meditation. Weekly guided sessions and discussions.",
    image: "https://placehold.co/600x400.png",
    aiHint: "meditation group"
  },
  {
    title: "Student Fitness Challenges",
    description: "Participate in fun monthly fitness challenges, track your progress, and win prizes.",
    image: "https://placehold.co/600x400.png",
    aiHint: "fitness challenge"
  },
  {
    title: "Healthy Cooking Workshops",
    description: "Learn to cook delicious and nutritious meals with our weekly online workshops.",
    image: "https://placehold.co/600x400.png",
    aiHint: "cooking class"
  },
  {
    title: "Campus Running Crew",
    description: "Connect with fellow runners for group runs around campus. All paces are welcome.",
    image: "https://placehold.co/600x400.png",
    aiHint: "running group"
  },
  {
    title: "Digital Detox Support",
    description: "Find support and strategies for reducing screen time and improving digital well-being.",
    image: "https://placehold.co/600x400.png",
    aiHint: "digital detox"
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Community & Classes</h1>
          <p className="text-muted-foreground">
            Connect with peers, join classes, and find your wellness community.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((community, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                 <Image
                  src={community.image}
                  alt={community.title}
                  fill
                  className="object-cover"
                  data-ai-hint={community.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold font-headline">{community.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-grow">{community.description}</p>
              <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Join Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
