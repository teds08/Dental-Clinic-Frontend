"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SessionExpiredModal } from "@/components/auth/SessionExpiredModal";
import { removeAuthToken } from "@/lib/api/auth";

export function SessionExpiredHandler() {
  const router = useRouter();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    function handleSessionExpired() {
      setIsSessionExpired(true);
    }

    window.addEventListener("rafe-session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("rafe-session-expired", handleSessionExpired);
    };
  }, []);

  function handleLogin() {
    removeAuthToken();
    router.replace("/login");
  }

  return (
    <SessionExpiredModal isOpen={isSessionExpired} onLogin={handleLogin} />
  );
}
