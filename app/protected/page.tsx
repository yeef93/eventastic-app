"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {    
    const decodedToken = jwt.decode(session.user.token) as JwtPayload | null;

    return (
      <div className="pt-96">
        Welcome to the protected page, {session.user.username}!<br />
        Email: {session.user.email}<br />
        Scope: {decodedToken?.scope ?? "N/A"}<br />
        Sub: {decodedToken?.sub ?? "N/A"}<br />
        Issuer: {decodedToken?.iss ?? "N/A"}<br />
        Expires At: {decodedToken?.exp ? new Date(decodedToken.exp * 1000).toLocaleString() : "N/A"}<br />
        Issued At: {decodedToken?.iat ? new Date(decodedToken.iat * 1000).toLocaleString() : "N/A"}<br />
        Session Expires: {session.expires}
      </div>
    );
  }

  return null;
};

export default ProtectedPage;