import React from 'react';

const Dropdowns = ({
  groupingOption,
  setGroupingOption,
  sortingOption,
  setSortingOption,
  groupTickets,
  sortTickets
}) => {
  return (
    <div>
      <label htmlFor="groupingOption">Group By:</label>
      <select
        id="groupingOption"
        value={groupingOption}
        onChange={e => setGroupingOption(e.target.value)}
      >
        <option value="status">By Status</option>
        <option value="user">By User</option>
        <option value="priority">By Priority</option>
      </select>

      <label htmlFor="sortingOption">Sort By:</label>
      <select
        id="sortingOption"
        value={sortingOption}
        onChange={e => setSortingOption(e.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>

      <button onClick={groupTickets}>Display</button>
      <button onClick={sortTickets}>Sort</button>
    </div>
  );
};

export default Dropdowns;