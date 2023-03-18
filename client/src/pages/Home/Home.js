import React from "react";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/Game";
import { Col, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row>
        <Col  md={2} sticky="top">
          <FilterBar />
        </Col>
        <Col  md={10}>
          <GameCard />
        </Col>
      </Row>
    </>
  );
};

export default Home;
