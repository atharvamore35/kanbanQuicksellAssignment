import React, { useState, useEffect } from 'react';
import './App.css';
import TicketCard from './components/TicketCard';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupTickets = () => {
    let groupedTickets = [];

    if (groupingOption === 'status') {
      // Group tickets by status
      const statusGroups = {};

      tickets.forEach(ticket => {
        const status = ticket.status;
        if (!statusGroups[status]) {
          statusGroups[status] = [];
        }
        statusGroups[status].push(ticket);
      });

      groupedTickets = Object.entries(statusGroups);
    } else if (groupingOption === 'user') {
      // Group tickets by user
      const userGroups = {};

      tickets.forEach(ticket => {
        const userId = ticket.userId;
        if (!userGroups[userId]) {
          userGroups[userId] = [];
        }
        userGroups[userId].push(ticket);
      });

      groupedTickets = Object.entries(userGroups);
    } else if (groupingOption === 'priority') {
      // Group tickets by priority
      const priorityGroups = {};

      tickets.forEach(ticket => {
        const priority = ticket.priority;
        if (!priorityGroups[priority]) {
          priorityGroups[priority] = [];
        }
        priorityGroups[priority].push(ticket);
      });

      groupedTickets = Object.entries(priorityGroups);
    }

    setGroupedTickets(groupedTickets);
  };

  const sortTickets = () => {
    let sortedTickets = [...tickets]; 

    if (sortingOption === 'priority') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'title') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    setTickets(sortedTickets);
  };

  const userNames = users.reduce((names, user) => {
    names[user.id] = user.name;
    return names;
  }, {});

  const priorityNames = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header_title">
        <h1>Kanban Board</h1>
        </div>
        <div className="header_content">
        <div className="header_options">
          <label htmlFor="groupingOption">Group By:</label>
          <select
            id="groupingOption"
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <option value="status">By Status</option>
            <option value="user">By User</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
        &emsp;
        <div className="header_options">
          <label htmlFor="sortingOption">Sort By:</label>
          <select
            id="sortingOption"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
        &emsp;
        <button onClick={groupTickets}>Display</button>&nbsp;
        <button onClick={sortTickets}>Sort</button>
        </div>
      </header>
      <div className="kanban-board">
{groupedTickets.map(([groupKey, groupTickets]) => (
  <div key={groupKey} className="kanban-column">
    <p>
      {groupingOption === 'user'
        ? userNames[groupKey]
        : groupingOption === 'priority'
        ? priorityNames[parseInt(groupKey)]
        : groupKey}
    </p>
    {groupTickets.map(ticket => (
      <TicketCard key={ticket.id} ticket={ticket} userNames={userNames} />
    ))}
  </div>
))}

      </div>
    </div>
  );
  
};

export default App;