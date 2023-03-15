import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light py-3 fixed-bottom">
      <Container className="sticky-bottom">
        <Row>
          <Col className="text-center">
            <p>This is the Footer page!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}