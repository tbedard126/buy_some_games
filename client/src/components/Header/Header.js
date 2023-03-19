import React from "react";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <Container fluid className="header">
      <h1>Buy Some Games<img className="controller"src="./images/controller-icon.png" alt="controller"></img></h1>
    </Container>
  );
}