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
      <SideBar>
        <div className="flex items-center space-x-4 pt-12 mb-5">
          <Image className="h-12 rounded-full" src="" alt="James Bhatta" />
          <div>
            <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
              James Bhatta
            </h4>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <PresentationChartLineIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <CalendarIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">My events</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <TicketIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">My tickets</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <UserIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <LockClosedIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Change password</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <LogoutIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Logout</span>
            </a>
          </li>
        </ul>
      </SideBar>

      <div className="w-full sm:w-9/12">
        <div className="p-4 text-gray-500">Content here...</div>
      </div>
    </div>
  );
}

export default Users;