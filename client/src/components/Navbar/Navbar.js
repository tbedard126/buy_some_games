import React, { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../auth/auth";
import AddGame from "../addGame";

export default function Navbar({ currentPage, handlePageChange }) {
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Nav>
      <div className="navbar">
        <Link to="/" className="nav-btn">
          Home
        </Link>
        <div className="user-buttons">
          {Auth.loggedIn() ? (
            <>
              <Link
                className="nav-btn m-2"
                to={`/users/${Auth.getProfile().data._id}`}
              >
                {Auth.getProfile().data.username}'s profile
              </Link>
              <AddGame />
              <span className="nav-btn m-2" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link className="nav-btn m-2" to="/login">
                Login
              </Link>
              <Link className="nav-btn m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        <span className="nav-btn m-2 float-right">Cart</span>
      </div>
    </Nav>
  );
}
