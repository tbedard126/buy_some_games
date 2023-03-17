import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Buy some Games!!!</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
