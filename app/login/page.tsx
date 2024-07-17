"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "@/components/LoginModal";

const LoginPage = () => {
  const { status } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoginModalOpen(true);
    }
  }, [status]);

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignUpClick = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="login-page">
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onSuccess={() => setIsLoginModalOpen(false)}
          openSignUp={handleSignUpClick}
        />
      )}
    </div>
  );
};

export default LoginPage;
