"use client";

import { useState, useCallback } from "react";
import { PoseDetector, type Exercise } from "@/components/pose-detector";
import {
  Dumbbell,
  PersonStanding,
  ChevronDown,
  Scan,
  ArrowLeft,
  Trophy,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ─── Exercise Definitions ─────────────────────────────────────────────────────

interface ExerciseDef {
  id: Exercise;
  name: string;
  description: string;
  howTo: string[];
  tips: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  muscles: string[];
  icon: React.ReactNode;
  gradient: string;
}

const EXERCISES: ExerciseDef[] = [
  {
    id: "bicep_curl",
    name: "Bicep Curl",
    description: "Build arm strength by curling weights towards your shoulder.",
    howTo: [
      "Stand with feet shoulder-width apart",
      "Hold weights with palms facing forward",
      "Curl up keeping elbows at sides",
      "Lower slowly and repeat",
    ],
    tips: [
      "Keep elbows fixed at your sides",
      "Don't swing your back",
      "Full range of motion counts",
    ],
    difficulty: "Beginner",
    muscles: ["Biceps", "Forearms"],
    icon: <Dumbbell className="h-7 w-7" />,
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "squat",
    name: "Squat",
    description: "Strengthen legs and glutes with the king of all exercises.",
    howTo: [
      "Stand feet shoulder-width apart",
      "Hinge at hips, bend knees",
      "Lower until thighs are parallel",
      "Drive through heels to stand",
    ],
    tips: [
      "Keep knees behind toes",
      "Chest stays up throughout",
      "Breathe in on the way down",
    ],
    difficulty: "Beginner",
    muscles: ["Quads", "Glutes", "Hamstrings"],
    icon: <PersonStanding className="h-7 w-7" />,
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "pushup",
    name: "Push-Up",
    description: "Classic upper body movement for chest, shoulders, and core.",
    howTo: [
      "Start in high plank position",
      "Lower chest to floor slowly",
      "Keep body in a straight line",
      "Press back up to start",
    ],
    tips: [
      "Don't let hips sag or rise",
      "Elbows at ~45° to body",
      "Keep core tight throughout",
    ],
    difficulty: "Intermediate",
    muscles: ["Chest", "Shoulders", "Triceps", "Core"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "shoulder_press",
    name: "Shoulder Press",
    description: "Press weights overhead to build strong, defined shoulders.",
    howTo: [
      "Hold weights at shoulder height",
      "Press straight overhead",
      "Fully extend arms at top",
      "Lower with control",
    ],
    tips: [
      "Don't arch your lower back",
      "Full lockout at the top",
      "Breathe out on the press",
    ],
    difficulty: "Intermediate",
    muscles: ["Shoulders", "Triceps", "Upper Chest"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    ),
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    id: "lunge",
    name: "Lunge",
    description: "Unilateral leg training to build balance and leg strength.",
    howTo: [
      "Stand upright, feet together",
      "Step one foot forward",
      "Lower back knee towards floor",
      "Push back to standing",
    ],
    tips: [
      "Keep front knee over ankle",
      "Torso stays upright",
      "Control the descent",
    ],
    difficulty: "Intermediate",
    muscles: ["Quads", "Glutes", "Hamstrings", "Core"],
    icon: <ChevronDown className="h-7 w-7" />,
    gradient: "from-rose-500/20 to-pink-500/10",
  },
];

const DIFFICULTY_COLOR = {
  Beginner: "bg-green-500/15 text-green-600 dark:text-green-400",
  Intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Advanced: "bg-red-500/15 text-red-500",
};

// ─── Exercise Card ────────────────────────────────────────────────────────────

function ExerciseCard({
  ex,
  onSelect,
}: {
  ex: ExerciseDef;
  onSelect: (id: Exercise) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative group rounded-2xl border border-border/60 bg-gradient-to-br ${ex.gradient} bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {ex.icon}
            </div>
            <div>
              <h3 className="font-semibold font-headline text-base text-foreground">
                {ex.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[ex.difficulty]}`}
                >
                  {ex.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {ex.description}
        </p>

        {/* Muscles */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ex.muscles.map((m) => (
            <span
              key={m}
              className="text-xs bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-full border border-border/40"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Expandable how-to */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <Info className="h-3.5 w-3.5" />
          <span>How to perform</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="mb-4 space-y-3 border-t border-border/40 pt-3">
            <div>
              <p className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Steps
              </p>
              <ol className="space-y-1">
                {ex.howTo.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Tips
              </p>
              <ul className="space-y-1">
                {ex.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="shrink-0 text-primary mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={() => onSelect(ex.id)}
          id={`start-${ex.id}`}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 hover:scale-[1.02] active:scale-100 transition-all duration-200 shadow-sm shadow-primary/20"
        >
          <Scan className="h-4 w-4" />
          Start Session
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PoseCoachPage() {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [repCount, setRepCount] = useState(0);
  const [sessionReps, setSessionReps] = useState<number[]>([]);
  const [liveStatus, setLiveStatus] = useState<"good" | "bad">("good");
  const [liveMessage, setLiveMessage] = useState("Get into position…");

  const handleSelect = useCallback((id: Exercise) => {
    setActiveExercise(id);
    setRepCount(0);
    setLiveStatus("good");
    setLiveMessage("Get into position…");
  }, []);

  const handleStop = useCallback(() => {
    setSessionReps((prev) => [...prev, repCount]);
    setActiveExercise(null);
    setRepCount(0);
  }, [repCount]);

  const handleRepCount = useCallback((count: number) => setRepCount(count), []);

  const handleFormFeedback = useCallback((status: "good" | "bad", message: string) => {
    setLiveStatus(status);
    setLiveMessage(message);
  }, []);

  const activeExDef = EXERCISES.find((e) => e.id === activeExercise);

  // ── Active Session View ───────────────────────────────────────────────────
  if (activeExercise && activeExDef) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleStop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exercises
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {activeExDef.icon}
            </div>
            <h1 className="text-base font-semibold font-headline text-foreground">
              {activeExDef.name}
            </h1>
          </div>
        </div>

        {/* Two-column layout: camera left, info panel right */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Camera + controls — takes most of the width */}
          <div className="flex-1 min-w-0">
            <PoseDetector
              exercise={activeExercise}
              onRepCount={handleRepCount}
              onFormFeedback={handleFormFeedback}
              onStop={handleStop}
            />
          </div>

          {/* Right panel: live feedback + exercise tips */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3">
            {/* Live feedback card */}
            <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
              liveStatus === "good"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {liveStatus === "good"
                  ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  : <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />}
                <span className={`text-sm font-semibold ${
                  liveStatus === "good" ? "text-green-600 dark:text-green-400" : "text-red-500"
                }`}>
                  {liveStatus === "good" ? "Good Form" : "Correct Your Form"}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed font-medium">
                {liveMessage}
              </p>
            </div>

            {/* Rep tally */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 text-center">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1">Reps This Set</p>
              <p key={repCount} className="text-6xl font-bold font-headline text-primary" style={{ animation: "repPop .3s ease-out" }}>{repCount}</p>
            </div>

            {/* Exercise tips */}
            <div className="bg-card border border-border/60 rounded-2xl p-4">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Form Tips</p>
              <ul className="space-y-2">
                {activeExDef.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="shrink-0 text-primary mt-0.5">›</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <style jsx>{`@keyframes repPop { 0%{transform:scale(1.5);opacity:.6} 100%{transform:scale(1);opacity:1} }`}</style>
      </div>
    );
  }

  // ── Exercise Selection View ───────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent p-6 md:p-8">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
            <Scan className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl">
              AI Pose Coach
            </h1>
            <p className="text-xs text-muted-foreground">
              Powered by MediaPipe Full Accuracy Model
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
          Select an exercise below. Your camera will open and our AI will
          monitor your form in real-time — counting reps only when your form is
          correct.
        </p>

        {/* Stats row */}
        {sessionReps.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-card/60 border border-border/50 rounded-xl px-3 py-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Session total:
              </span>
              <span className="text-sm font-bold text-foreground">
                {sessionReps.reduce((a, b) => a + b, 0)} reps
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 border border-border/50 rounded-xl px-3 py-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Sets completed:
              </span>
              <span className="text-sm font-bold text-foreground">
                {sessionReps.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Instructions banner */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-amber-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            Before you start
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            Ensure good lighting and position yourself so your full body or the
            relevant limbs are visible to the camera. Allow camera permission
            when prompted.
          </p>
        </div>
      </div>

      {/* Exercise grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXERCISES.map((ex) => (
          <ExerciseCard key={ex.id} ex={ex} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
