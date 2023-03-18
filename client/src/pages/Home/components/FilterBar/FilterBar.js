import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

export default function FilterBar() {
  // buttons to pull from db
  const categories = [
    "All Games",
    "Super Nintendo",
    "Nintendo",
    "Nintendo 64",
    "Sega Genesis",
  ];

  // arrange categories
  const sortChoices = ["Sort by Name", "Sort by Price", "Sort By Popular"];

  return (
    <div>
      <ul id="categories">
        {categories.map((cat) => (
          <li>{cat}</li>
        ))}
      </ul>
      <ul id="sortChoices">
        {sortChoices.map((sort) => (
          <li>{sort}</li>
        ))}
      </ul>
    </div>
  );
}
