"use client";

import { useEffect, useState } from "react";

import { getAdminProfile } from "@/lib/api/admin/profile";

import type { AdminProfile } from "@/types/admin/profile";

export function useAdminProfile() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchProfile() {
      try {
        setIsLoading(true);
        setError("");

        const response = await getAdminProfile();

        if (isCancelled) return;

        setProfile(response.data);
      } catch (error) {
        if (isCancelled) return;

        setProfile(null);
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load admin profile.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    profile,
    isLoading,
    error,
  };
}
