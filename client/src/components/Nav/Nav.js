import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

export default function Nav() {
  const NavTabs = ({ currentPage, handlPageChange }) => {
    const links = [
      { name: "Home", href: "#home" },
      { name: "Profile", href: "#profile" },
      { name: "Sign In", href: "#signIn" },
      { name: "Sign Out", href: "#signOut" },
      { name: "Cart", href: "#cart" },
    ];
  };

  return (
    <Nav variant="tabs" activeKey={currentPage} onSelect={handlePageChange}>
      {links.map((link) => (
        <Nav.Item key={link.name}>
          <Nav.Link eventKey={link.name} href={link.href}>
            {link.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};