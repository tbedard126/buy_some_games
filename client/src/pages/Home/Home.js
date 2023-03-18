import React from "react";
import AddGame from "../../components/addGame";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/Game";

const Home = () => {
  return (
    <div className="container">
      <AddGame />
      <FilterBar />
      <GameCard />
    </div>
  );
};

export default Home;
