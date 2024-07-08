import React, { useState } from "react";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import {
  CalendarIcon,
  LockClosedIcon,
  LogoutIcon,
  PresentationChartLineIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";

function Users() {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen pt-4">
      <div className="w-full sm:w-9/12">
        <div className="p-4 text-gray-500">Content here...</div>
      </div>
    </div>
  );
}

export default Users;