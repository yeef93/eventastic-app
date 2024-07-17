"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "@/components/LoginModal";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import UpcomingEvent from "../components/Home/UpcomingEvent";
import CallToAction from "../components/Home/CallToAction";
import EventbyLocation from "../components/Home/EventbyLocation";
import EventCreationCTA from "../components/Home/EventCreationCTA";

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
      <Hero />
      <Categories />
      <UpcomingEvent />
      <CallToAction />
      <EventbyLocation />
      <EventCreationCTA />
    </div>
  );
};

export default LoginPage;
