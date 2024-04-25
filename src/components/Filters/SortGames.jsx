import React, { useState } from "react";

const SortGames = ({ onSortChange }) => {
  const [sortField, setSortField] = useState("name"); // 'name' ou 'released'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'

  const handleSortChange = (field) => {
    const isAscending = sortField === field && sortOrder === "asc";
    const newOrder = isAscending ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    onSortChange(field, newOrder);
  };

  return (
    <div className="flex flex-row gap-12">
      <button onClick={() => handleSortChange("name")}>
        Sort by Name{" "}
        {sortField === "name" ? (sortOrder === "asc" ? "⭡" : "⭣") : ""}
      </button>
      <button onClick={() => handleSortChange("released")}>
        Sort by Release Date{" "}
        {sortField === "released" ? (sortOrder === "asc" ? "⭡" : "⭣") : ""}
      </button>
    </div>
  );
};

export default SortGames;
