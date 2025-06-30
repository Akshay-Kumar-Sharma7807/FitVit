import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleUser, Upload } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <CircleUser className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Profile & Goals</h1>
          <p className="text-muted-foreground">
            Manage your personal information and set your wellness intentions.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your profile details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Alex Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="goal">Primary Wellness Goal</Label>
                         <Select defaultValue="skin-health">
                            <SelectTrigger id="goal">
                                <SelectValue placeholder="Select your primary goal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="muscle-building">Muscle Building</SelectItem>
                                <SelectItem value="skin-health">Glowing Skin</SelectItem>
                                <SelectItem value="healthy-aging">Healthy Aging</SelectItem>
                                <SelectItem value="stress-reduction">Stress Reduction</SelectItem>
                                <SelectItem value="weight-management">Weight Management</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                     <Avatar className="h-32 w-32">
                        <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="person avatar" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Picture</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
