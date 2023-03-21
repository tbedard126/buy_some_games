import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { QUERY_GAMES_BY_CAT } from "../../../../graphql/queries";
import { Link } from "react-router-dom";

export default function FilterBar({ setShowAllGames }) {
  const [category, setCategory] = useState();
  // const [setShowGames, setShowAllGames] = useState(false);

  const { loading, error, data } = useQuery(QUERY_GAMES_BY_CAT, {
    variables: { category },
  });

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setShowAllGames(false);
  };

  return (
    <>
      <div className="d-grid gap-2">
        <Button
          variant="outline-dark"
          onClick={() => {
            setCategory("");
            setShowAllGames(true);
          }}
        >
          All Games
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            setCategory("Nintendo");
            setShowAllGames(false);
          }}
        >
          Nintendo
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => handleCategoryClick("Super Nintendo")}
        >
          Super Nintendo
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => handleCategoryClick("Nintendo 64")}
        >
          Nintendo 64
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => handleCategoryClick("Sega Genesis")}
        >
          Sega Genesis
        </Button>
      </div>
      {/* <div className="d-grid gap-2">
        <Button variant="outline-dark">Sort by Name</Button>
        <Button variant="outline-dark">Sort by Price</Button>
        <Button variant="outline-dark">Sort by Popular</Button>
      </div> */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4 cardsCont">
          {data.gamesByCtgy.map((game) => (
            <Col key={game._id}>
              <Link to={`/games/${game._id}`}>
                <Card style={{ width: "18rem", height: "100%" }}>
                  <Card.Img
                    className="zoom img"
                    variant="top"
                    src={game.imgUrl}
                    style={{
                      height: "10rem",
                      width: "18rem",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body className="cardbody">
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>{game.price}</Card.Text>
                    <Card.Text>{game.category}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
