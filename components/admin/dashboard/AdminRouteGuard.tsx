"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SessionExpiredModal } from "@/components/auth/SessionExpiredModal";
import { getAuthToken, removeAuthToken } from "@/lib/api/auth";
import { decodeJwt, isTokenExpired } from "@/lib/jwt";
import { ClientOnly } from "@/components/auth/ClientOnly";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  return (
    <ClientOnly>
      <AdminAuthCheck>{children}</AdminAuthCheck>
    </ClientOnly>
  );
}

interface AdminAuthCheckProps {
  children: React.ReactNode;
}

function AdminAuthCheck({ children }: AdminAuthCheckProps) {
  const router = useRouter();

  const token = getAuthToken();
  const payload = token ? decodeJwt(token) : null;

  const isExpired = token ? isTokenExpired(token) : false;

  const isValidAdmin = payload !== null && payload.role_id === 1 && !isExpired;

  useEffect(() => {
    if (!token || (!isExpired && !isValidAdmin)) {
      router.replace("/login");
    }
  }, [token, isExpired, isValidAdmin, router]);

  if (!token || (!isExpired && !isValidAdmin)) {
    return null;
  }

  if (isExpired) {
    return (
      <>
        {children}

        <SessionExpiredModal
          isOpen={true}
          onLogin={() => {
            removeAuthToken();
            router.replace("/login");
          }}
        />
      </>
    );
  }

  return <>{children}</>;
}
