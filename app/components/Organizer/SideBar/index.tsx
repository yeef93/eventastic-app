import SideBar from "@/components/SideBar";
import Image from "next/image";
import {
    CalendarIcon,
    CurrencyDollarIcon,
    LockClosedIcon,
    LogoutIcon,
    PresentationChartLineIcon,
    TicketIcon,
    UserIcon,
    UsersIcon,
  } from "@heroicons/react/outline";

function Sidebar(){
    return(
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
              <span className="text-center sm:text-left">Events</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <UsersIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Attendees</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
            >
              <span className="text-gray-600">
                <CurrencyDollarIcon className="w-5 h-5 mr-1 text-gray-700" />
              </span>
              <span className="text-center sm:text-left">Financials</span>
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
    )
}

export default Sidebar;