import React from "react";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/Game";

const Home = () => {
  return (
    <div className="container">
      <FilterBar />
      <GameCard />
    </div>
  );
};

export default Home;
