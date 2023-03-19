import React from "react";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/Game";
import { Col, Row } from "react-bootstrap";
import ImageCarousel from "../../components/Carousel/Carousel";
const images = [
  {
    src: "/images/Snes.jpg",
    alt: "Super Nintendo",
  },
  {
    src: "/images/sega.jpg",
    alt: "Sega Genesis",
  },
  {
    src: "/images/Nes.jpg",
    alt: "Nintendo",
  },
  {
    src: "/images/n64.jpg",
    alt: "Nintendo 64",
  },
];

const Home = () => {
  return (
    <>
      <Row>
        <ImageCarousel images={images} />
        <Col md={2} sticky="top">
          <FilterBar />
        </Col>
        <Col md={10}>
          <GameCard />
        </Col>
      </Row>
    </>
  );
};

export default Home;
