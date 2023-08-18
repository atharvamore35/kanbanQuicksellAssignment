import React from 'react';

const KanbanCard = ({ ticket, users }) => {
  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>User: {users.find(user => user.id === ticket.userId)?.name}</p> {/* Display user's name */}
      <p>Priority: {ticket.priority}</p>
      <p>Title: {ticket.title}</p> {/* Display ticket title */}
    </div>
  );
};

export default KanbanCard;
