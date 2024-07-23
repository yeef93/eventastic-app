interface Ticket {
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
            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <p>
                <strong>Type:</strong> {ticket.type}
              </p>
              <p>
                <strong>Price:</strong> {ticket.issuedAt}
              </p>
              <p>
                <strong>Seats Available:</strong> {ticket.ticketCode}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TicketList;  