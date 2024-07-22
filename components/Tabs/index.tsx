import { useState } from 'react';

// Define types for event data and tickets
interface EventData {
  title: string;
  description: string;
  // Add other event details if needed
}

interface Ticket {
  id: string;
  ticketType: string;
  ticketCode: string;
}

interface TabsProps {
  eventData?: EventData;
  tickets: Ticket[];
}

const Tabs: React.FC<TabsProps> = ({ eventData, tickets }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'tickets'>('details');

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('details')}
          className={`py-2 px-4 rounded-t-lg focus:outline-none ${activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Detail
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`py-2 px-4 rounded-t-lg focus:outline-none ${activeTab === 'tickets' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ticket List
        </button>
      </div>

      {activeTab === 'details' && eventData && (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-2">{eventData.title}</h1>
          <p className="text-gray-700">{eventData.description}</p>
          {/* Display other event details */}
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tickets</h2>
          <ul className="space-y-2">
            {tickets.map(ticket => (
              <li key={ticket.id} className="border-b border-gray-200 pb-2">
                <p className="text-gray-800">Type: {ticket.ticketType}</p>
                <p className="text-gray-600">Code: {ticket.ticketCode}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tabs;
