import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkoutLog {
  day: string; // "Mon", "Tue", etc.
  workouts: number;
  date: Date;
}

export interface IUserStats {
  streak: number;
  hydrationLiters: number;
  activeMinutes: number;
  workoutsCompleted: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  fitnessGoal?: string;
  stats: IUserStats;
  workoutLogs: IWorkoutLog[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutLogSchema = new Schema<IWorkoutLog>(
  {
    day: { type: String, required: true },
    workouts: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserStatsSchema = new Schema<IUserStats>(
  {
    streak: { type: Number, default: 0 },
    hydrationLiters: { type: Number, default: 0 },
    activeMinutes: { type: Number, default: 0 },
    workoutsCompleted: { type: Number, default: 0 },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    image: {
      type: String,
      default: "",
    },
    fitnessGoal: {
      type: String,
      default: "",
    },
    stats: {
      type: UserStatsSchema,
      default: () => ({
        streak: 0,
        hydrationLiters: 0,
        activeMinutes: 0,
        workoutsCompleted: 0,
      }),
    },
    workoutLogs: {
      type: [WorkoutLogSchema],
      default: () => [
        { day: "Mon", workouts: 0 },
        { day: "Tue", workouts: 0 },
        { day: "Wed", workouts: 0 },
        { day: "Thu", workouts: 0 },
        { day: "Fri", workouts: 0 },
        { day: "Sat", workouts: 0 },
        { day: "Sun", workouts: 0 },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
