import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../../../graphql/queries";

export default function GameCard() {
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`${error}`}</p>;

  return (
    <div>
      <div className="gamesTitle">
        {" "}
        <h1>Games for sale!</h1>
      </div>
      <Row xs={1} sm={2} md={3} className="g-4">
        {data.games.map((game) => (
          <Col className="cardOrg" key={game._id}>
            <Link to={`/games/${game._id}`}>
              <Card style={{ width: "18rem", height: "100%" }}>
                <img
                  className="zoom img"
                  variant="top"
                  src={game.imgUrl}
                  alt={game.name}
                  style={{
                    height: "10rem",
                    width: "18rem",
                    objectFit: "cover",
                  }}
                />
                <div className="cardbody">
                  <div className="cardGameInfo">{game.name}</div>
                  <div className="cardGameInfo">${game.price}</div>
                  <div className="cardGameInfo">{game.category}</div>
                  <div className="cardGameInfo">{game.description}</div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
