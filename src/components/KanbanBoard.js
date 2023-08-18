import React from 'react';
import TicketCard from './TicketCard';

const KanbanBoard = ({ groupedTickets }) => {
  return (
    <div className="kanban-board">
      {groupedTickets.map(([groupKey, groupTickets]) => (
        <div key={groupKey} className="kanban-column">
          <h2 className="col_title">{groupKey}</h2>
          {groupTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;