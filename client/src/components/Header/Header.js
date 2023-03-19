import React from "react";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <Container fluid className="headerCont">
      <h1 className="header">Buy Some Games<img className="controller"src="./images/controller-icon.png" alt="controller"></img></h1>
    </Container>
  );
}