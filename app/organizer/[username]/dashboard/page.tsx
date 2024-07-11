import {
  CalendarIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from "@heroicons/react/outline";

function Dashboard() {
  return (
    <div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-gradient-to-r from-yellow-200 to-pink-400 rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-red-500 bg-yellow-200 rounded-full">
            <CalendarIcon className="w-6 h-6 mr-1 text-pink-500"></CalendarIcon>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">
              Upcoming Events
            </p>
            <p className="text-lg font-semibold text-white">4</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-purple-500 bg-blue-100 rounded-full">
            <CalendarIcon className="w-6 h-6 mr-1 text-purple-500"></CalendarIcon>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">Total Events</p>
            <p className="text-lg font-semibold text-white">5</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gradient-to-r from-emerald-500 to-lime-600 rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
            <TicketIcon className="w-6 h-6 mr-1 text-green-500"></TicketIcon>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">Ticket Sold</p>
            <p className="text-lg font-semibold text-white">12</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
            <CurrencyDollarIcon className="w-6 h-6 mr-1 text-yellow-500"></CurrencyDollarIcon>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white">Total Revenue</p>
            <p className="text-lg font-semibold text-white">Rp 10.000,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
