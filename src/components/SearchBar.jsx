import React from "react";

export function SearchBar({ filterText, setFilterText, filteredPodcasts }) {
  return (
    <div className="searchbar">
      <span>{filteredPodcasts.length}</span>
      <input
        type="text"
        value={filterText}
        placeholder="Filter podcasts..."
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
}