import React from "react";

const SearchItem = ({ query, setQuery }) => {
  return (
    <div className="searchItem">
      <input
        type="text"
        placeholder="Search an Item"
        className="add-item-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchItem;
