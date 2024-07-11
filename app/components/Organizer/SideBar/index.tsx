"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  LogoutIcon,
  PresentationChartLineIcon,
  UserIcon,
} from "@heroicons/react/outline";
import LogoutModal from "@/components/LogoutModal";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const username = pathname.split('/')[2]; // Extract username from pathname
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const points = 100;
  const expiredDate = "2024/12/02";

  const handleLogoutClick = (e:any) => {
    e.preventDefault();
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    // Perform logout action here, e.g., call API and redirect to login page
    router.push("/");
  };

  const menuItems = [
    { href: `/organizer/${username}/dashboard`, label: "Dashboard", icon: PresentationChartLineIcon },
    { href: `/organizer/${username}/wallets`, label: "My wallets", icon: CurrencyDollarIcon },
    { href: `/organizer/${username}/events`, label: "Events", icon: CalendarIcon },
  ];

  return (
    <div className="w-80 bg-white h-auto min-h-svh p-6">
      <div className="flex flex-col items-center pt-12 mb-5">
        <Image className="h-12 rounded-full" src="" alt="James Bhatta" />
        <div className="mt-2 text-center">
          <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
            James Bhatta
          </h4>          
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {menuItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium ${
                pathname === item.href ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              <span className="text-gray-600">
                <item.icon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">{item.label}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogoutClick}
            className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium w-full text-left hover:bg-gray-200"
          >
            <span className="text-gray-600">
              <LogoutIcon className="w-5 h-5 mr-1 text-gray-700" />
            </span>
            <span className="text-center sm:text-left">Logout</span>
          </button>
        </li>
      </ul>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default Sidebar;