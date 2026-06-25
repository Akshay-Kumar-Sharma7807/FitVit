"use client";

import { useState, useEffect, useCallback } from "react";

export interface UserStats {
  streak: number;
  hydrationLiters: number;
  activeMinutes: number;
  workoutsCompleted: number;
}

export interface WorkoutLog {
  day: string;
  workouts: number;
}

export interface UserProfile {
  name: string;
  email: string;
  image?: string;
  fitnessGoal?: string;
  stats: UserStats;
  workoutLogs: WorkoutLog[];
  memberSince: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Ensure we don't hit Next.js aggressive cache or browser cache
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/user/profile?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to load profile (Status: ${res.status})`);
      }
      
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("useUserProfile fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
