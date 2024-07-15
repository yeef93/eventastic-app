"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  CalendarIcon,
  CreditCardIcon,
  LockClosedIcon,
  LogoutIcon,
  PresentationChartLineIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import LogoutModal from "@/components/LogoutModal";
import { useSession, signOut } from "next-auth/react";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const username = pathname.split('/')[2];
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/assets/avatar.png"); // Default avatar
  const [fullName, setFullName] = useState("");
  const [points, setPoints] = useState<number>(0);
  const [expiredDate, setExpiredDate] = useState<string>("");
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiUrl}/users/me`, {
            headers: {
              'Authorization': `Bearer ${session.user.token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            setAvatarUrl(data.data.avatar.imageUrl || "/assets/avatar.png"); // Use default if not available
            setFullName(data.data.fullName);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchUserPoints = async () => {
        try {
          const response = await fetch(`${apiUrl}/users/me/points`, {
            headers: {
              'Authorization': `Bearer ${session.user.token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            setPoints(data.data.points);
            setExpiredDate(new Date(data.data.expiresAt).toLocaleString("en-US", {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }));
          }
        } catch (error) {
          console.error("Error fetching user points:", error);
        }
      };

      fetchUserData();
      fetchUserPoints();
    }
  }, [session, apiUrl]);

  const handleLogoutClick = (e: any) => {
    e.preventDefault();
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    signOut();
    router.push("/");
  };

  const formatPoints = (points: number) => {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2 }).format(points);
  };

  const menuItems = [
    { href: `/users/${username}/dashboard`, label: "Dashboard", icon: PresentationChartLineIcon },
    { href: `/users/${username}/events`, label: "My events", icon: CalendarIcon },
    { href: `/users/${username}/tickets`, label: "My tickets", icon: TicketIcon },
    { href: `/users/${username}/profile`, label: "Profile", icon: UserIcon },
    { href: `/users/${username}/change-password`, label: "Change password", icon: LockClosedIcon },
  ];

  return (
    <div className="w-80 bg-white h-auto min-h-screen p-6">
      <div className="flex flex-col items-center pt-12 mb-5">
        <Image
          className="h-24 w-24 rounded-full"
          src={avatarUrl}
          alt={fullName || "User Avatar"}
          width={96}
          height={96}
        />
        <div className="mt-2 text-center">
          <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
            {fullName}
          </h4>
          <div className="flex justify-center">
            <CreditCardIcon className="w-4 h-4 mr-1 text-yellow-500" />
            <p className="text-sm text-yellow-500">Rp. {formatPoints(points)} points</p>
          </div>
          <p className="text-xs text-gray-500">Expired Date: {expiredDate}</p>
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