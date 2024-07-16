"use client";
import React from "react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface ProtectedLayoutProps {
    children: ReactNode;
  }

function ProtectedLayout ({ children }:ProtectedLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // You can show a loading spinner or skeleton screen
  }

  if (session) {
    return <>{children}</>;
  }

  return null; // Or a fallback UI
};

export default ProtectedLayout;