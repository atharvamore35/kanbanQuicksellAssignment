import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, userNames }) => {
  return (
    <div className="kanban-card">
      <h3 id="CardTitle">{ticket.id}</h3>
      <p id="content">{ticket.title}</p> 
      <div className="card-icons">
        <div className={`priority-icon priority-${ticket.priority}`}>
          <span id="flairs">Priority: {ticket.priority}</span>
        </div>
        <div className="tag-icon"><span id="flairs">Tag: {ticket.tag[0]}</span></div>
      </div>
      <div id="userInfo">
        {userNames && <p>User: {userNames[ticket.userId]}</p>}
      </div>
      {ticket.status && (
        <div className="status-icon">
          Status: {ticket.status}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
