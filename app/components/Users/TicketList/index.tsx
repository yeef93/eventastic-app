import { QRCodeSVG } from 'qrcode.react';

interface Ticket {
  title: string;
  type: string;
  issuedAt: string;
  ticketCode: string;
}

interface TicketListProps {
  tickets: Ticket[];
}

function TicketList({ tickets }: TicketListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tickets</h2>
      <ul>
        {tickets.map((ticket, index) => (
          <li
            key={index}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md"
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <p className=' text-purple-700 text-sm '>
                  <strong>{ticket.title}</strong>
                </p>
                <p>
                  <strong>Type:</strong> {ticket.type}
                </p>
                <p>
                  <strong>Issued at:</strong> {ticket.issuedAt}
                </p>
              </div>
              <div className="flex flex-col items-center border-l-2 border-dashed px-8">
                <p className="mb-2">
                  <strong>Ticket code:</strong> {ticket.ticketCode}
                </p>
                <QRCodeSVG value={ticket.ticketCode} size={64} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;