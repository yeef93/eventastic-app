"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import MenuContext from "@/context/MenuContext";
import Menu from "../Menu";
import SignUpModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";

function Header() {
  const [showing, setShowing] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { setShowing: setGlobalMenuShowing } = useContext(MenuContext);

  useEffect(() => {
    console.log("showing state:", showing);
  }, [showing]);

  const handleClickButton = () => {
    setShowing((prev) => !prev);
    setGlobalMenuShowing();
  };

  const handleSignUpClick = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false); // Close login modal when opening sign up modal
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false); // Close sign up modal when opening login modal
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3">
            <Image src={Logo} width={32} alt="Eventastic Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-purple-800">
              Eventastic
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <button
              type="button"
              className=" text-gray-900 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={handleLoginClick}
            >
              Log in
            </button>
            <button
              type="button"
              className="text-white bg-purple-800 hover:text-gray-200 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
            <button
              onClick={handleClickButton}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={showing ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              showing ? "" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <Menu />
          </div>
        </div>
      </nav>
      {isSignupModalOpen && (
        <SignUpModal
          onClose={handleCloseSignupModal}
          openLogin={handleLoginClick}
        />
      )}{" "}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseLoginModal}
          openSignUp={handleSignUpClick}
        />
      )}{" "}
    </>
  );
}

export default Header;
