import React, { useState } from "react";

// imports our components
import Navbar from "./Navbar";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";

// imports our pages
import Home from "../pages/Home";
import Game from "../pages/Game";
import Login from "../pages/Login";
import Seller from "../pages/Seller";

export default function Container() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () =>
    currentPage === "Home" ? (
      <Home />
    ) : currentPage === "Game" ? (
      <Game />
    ) : currentPage === "Login" ? (
      <Login />
    ) : currentPage === "Seller" ? (
      <Seller />
    ) : null;
    
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* this is using the current state of the webapge, and also asinging a new state */}
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* this is calling the renderpage function to render our selected page */}
      {renderPage()}
    </div>
  );
}

