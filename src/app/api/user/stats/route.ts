import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export const dynamic = "force-dynamic";

// PATCH /api/user/stats — update any of the stats fields
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { streak, hydrationLiters, activeMinutes, workoutsCompleted } = body;

    await connectDB();

    const updateFields: any = {};
    if (streak !== undefined) updateFields["stats.streak"] = Number(streak);
    if (hydrationLiters !== undefined) updateFields["stats.hydrationLiters"] = Number(hydrationLiters);
    if (activeMinutes !== undefined) updateFields["stats.activeMinutes"] = Number(activeMinutes);
    if (workoutsCompleted !== undefined) updateFields["stats.workoutsCompleted"] = Number(workoutsCompleted);

    // Use findOneAndUpdate with upsert/set to correctly apply updates even if stats object doesn't fully exist
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ stats: user.stats });
  } catch (error) {
    console.error("[STATS PATCH ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update stats" },
      { status: 500 }
    );
  }
}
