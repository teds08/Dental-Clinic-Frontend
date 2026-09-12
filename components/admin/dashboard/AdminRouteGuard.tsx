"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SessionExpiredModal } from "@/components/auth/SessionExpiredModal";
import { getAuthToken, removeAuthToken } from "@/lib/api/auth";
import { decodeJwt, isTokenExpired } from "@/lib/jwt";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();

  const token = getAuthToken();
  const payload = token ? decodeJwt(token) : null;

  const hasNoToken = !token;
  const isExpired = token ? isTokenExpired(token) : false;
  const isInvalidRole = !isExpired && (!payload || payload.role_id !== 1);

  useEffect(() => {
    if (hasNoToken || isInvalidRole) {
      router.replace("/login");
    }
  }, [hasNoToken, isInvalidRole, router]);

  function handleLogin() {
    removeAuthToken();
    router.replace("/login");
  }

  if (hasNoToken || isInvalidRole) {
    return null;
  }

  if (isExpired) {
    return (
      <>
        {children}

        <SessionExpiredModal isOpen={true} onLogin={handleLogin} />
      </>
    );
  }

  return <>{children}</>;
}
