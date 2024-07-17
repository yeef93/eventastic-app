"use client";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import jwt, { JwtPayload } from "jsonwebtoken";
import DashboardSkeleton from "@/components/Skeleton/DashboardSkeleton";

interface ProtectedLayoutProps {
  children: ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleSessionExpiration = () => {
      if (status === "authenticated") {
        const decodedToken = jwt.decode(
          session?.user?.token || ""
        ) as JwtPayload | null;
        if (!decodedToken || decodedToken.scope !== "ROLE_ORGANIZER") {
          window.location.href = "/";
        } else {
          // console.log(decodedToken.exp);
          const tokenExpirationTime = decodedToken.exp
            ? decodedToken.exp * 1000
            : 0;
          const checkSessionExpiration = () => {
            if (Date.now() >= tokenExpirationTime) {
              signOut(); // Signs out the user if token is expired
              handleLogout(); // Initiates API logout
              window.location.href = "/";
            }
          };

          const intervalId = setInterval(checkSessionExpiration, 1000 * 60); // Check every minute

          // Clean up the interval on component unmount
          return () => clearInterval(intervalId);
        }
      } else if (status === "unauthenticated") {
        // router.push("/")
        router.push("/login"); // Redirect to login page if unauthenticated
      }
    };

    const handleLogout = async () => {
      try {
        const response = await fetch(`${process.env.base_url}/auth/logout`, {
          method: "POST",
          credentials: "include", // Optional, if you're using cookies
        });
        if (response.ok) {
          console.log("Logout successful"); // Optional: Handle success message
        } else {
          console.error("Logout failed"); // Optional: Handle error message
        }
      } catch (error) {
        console.error("Error during logout:", error); // Optional: Handle fetch error
      }
    };

    const intervalId = setInterval(handleSessionExpiration, 1000 * 60); // Check

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <DashboardSkeleton />
      </div>
    );
  }

  if (session) {
    return <>{children}</>;
  }

  return null; // Or a fallback UI
}

export default ProtectedLayout;