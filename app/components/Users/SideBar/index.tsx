"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  CalendarIcon,
  LockClosedIcon,
  LogoutIcon,
  PresentationChartLineIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  const router = useRouter();
  const { username } = usePathname();

  const menuItems = [
    { href: `/users/${username}/dashboard`, label: "Dashboard", icon: PresentationChartLineIcon },
    { href: `/users/${username}/events`, label: "My events", icon: CalendarIcon },
    { href: `/users/${username}/tickets`, label: "My tickets", icon: TicketIcon },
    { href: `/users/${username}/profile`, label: "Profile", icon: UserIcon },
    { href: `/users/${username}/change-password`, label: "Change password", icon: LockClosedIcon },
    { href: `/users/${username}/logout`, label: "Logout", icon: LogoutIcon },
  ];

  return (
    <div className="w-64 bg-white h-screen p-4">
      <div className="flex items-center space-x-4 pt-12 mb-5">
        <Image className="h-12 rounded-full" src="" alt="James Bhatta" />
        <div>
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
                router.asPath === item.href ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              <span className="text-gray-600">
                <item.icon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;