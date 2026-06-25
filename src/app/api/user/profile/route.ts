import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export const dynamic = "force-dynamic";

// GET /api/user/profile — returns the current user's profile data
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).select(
    "-password"
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Provide safe defaults for users created before stats/workoutLogs were added
  const defaultStats = {
    streak: 0,
    hydrationLiters: 0,
    activeMinutes: 0,
    workoutsCompleted: 0,
  };

  const defaultLogs = [
    { day: "Mon", workouts: 0 },
    { day: "Tue", workouts: 0 },
    { day: "Wed", workouts: 0 },
    { day: "Thu", workouts: 0 },
    { day: "Fri", workouts: 0 },
    { day: "Sat", workouts: 0 },
    { day: "Sun", workouts: 0 },
  ];

  return NextResponse.json({
    name: user.name,
    email: user.email,
    image: user.image ?? "",
    fitnessGoal: user.fitnessGoal ?? "",
    stats: user.stats ?? defaultStats,
    workoutLogs: user.workoutLogs?.length ? user.workoutLogs : defaultLogs,
    memberSince: user.createdAt,
  });
}

// PATCH /api/user/profile — updates name, fitnessGoal
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, fitnessGoal } = body;

  await connectDB();

  const updated = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      ...(name && { name }),
      ...(fitnessGoal !== undefined && { fitnessGoal }),
    },
    { new: true, select: "-password" }
  );

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: updated.name,
    email: updated.email,
    fitnessGoal: updated.fitnessGoal,
    message: "Profile updated successfully",
  });
}
