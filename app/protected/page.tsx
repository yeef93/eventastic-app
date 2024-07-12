"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <div>Welcome to the protected page, {session.user?.email}!</div>;
  }

  return null;
};

export default ProtectedPage;
