import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

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
    <>
      <div className="d-grid gap-2">
        <Button  variant="outline-dark">All Games</Button>
        <Button  variant="outline-dark">Nintendo</Button>
        <Button  variant="outline-dark">Super Nintendo</Button>
        <Button  variant="outline-dark">Nintendo 64</Button>
        <Button  variant="outline-dark">Sega Genesis</Button>
      </div>
      <div className="d-grid gap-2">
        <Button  variant="outline-dark">Sort by Name</Button>
        <Button  variant="outline-dark">Sort by Price</Button>
        <Button  variant="outline-dark">Sort by Popular</Button>
      </div>
    </>

    // <div>
    //   <ul id="categories">
    //     {categories.map((cat) => (
    //       <li>{cat}</li>
    //     ))}
    //   </ul>
    //   <ul id="sortChoices">
    //     {sortChoices.map((sort) => (
    //       <li>{sort}</li>
    //     ))}
    //   </ul>
    // </div>
  );
}
