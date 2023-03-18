import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Auth from '../../auth/auth';
import AddGame from "../addGame";

export default function Navbar({ currentPage, handlePageChange }) {

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Nav variant="tabs">
      <div>
        <Link to="/">Home</Link>
      </div>
      {Auth.loggedIn() ? (
        <>
          <span>Signed in as {Auth.getProfile().data.username}</span>
          <Link className="btn btn-lg btn-info m-2" to={`/users/${Auth.getProfile().data._id}`}>
            {Auth.getProfile().data.username}'s profile
          </Link>
          <AddGame />
          <button className="btn btn-lg btn-light m-2" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn" to="/signup">
            Signup
          </Link>
        </>
      )}
      <div>
        <button>Cart</button>
      </div>
    </Nav>
  );
}
