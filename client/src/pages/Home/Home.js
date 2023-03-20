import React, { useState } from "react";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/Game/Game";
import { Col, Row } from "react-bootstrap";
import ImageCarousel from "../../components/Carousel/Carousel";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../graphql/queries";

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
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);
  const [showAllGames, setShowAllGames] = useState(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`${error}`}</p>;

  return (
    <>
      <Row>
        <ImageCarousel images={images} />
        <Col md={2} sticky="top">
          <FilterBar setShowAllGames={setShowAllGames} />
        </Col>
        {showAllGames ? (
          <Col md={10}>
            <GameCard data={data} />
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};

export default Home;
