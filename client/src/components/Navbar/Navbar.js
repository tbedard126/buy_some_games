import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../auth/auth";
import AddGame from "../addGame";
import Cart from "../Cart";

export default function Navbar() {
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
        <span className="nav-btn m-2 float-right">
          <Cart />
        </span> {/* this will become an the imported 'cart' component (button) */}
      </div>
    </Nav>
  );
}
