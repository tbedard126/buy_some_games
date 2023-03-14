import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>React Bootstrap Header</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
