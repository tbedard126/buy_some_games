import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAME } from "../../graphql/queries";
import { Col, Container, Row, Image, Button } from "react-bootstrap";

export default function Game() {
  const { gameId } = useParams();
  const { loading, error, data } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });
  const selectedGame = data?.game || {};
  console.log(selectedGame.imgUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Container>
      <h1>{selectedGame.name}</h1>
      <Row>
        <Col xs={12} md={6}>
          <Image
            className="zoom"
            src={selectedGame.imgUrl}
            alt={selectedGame.name}
            fluid
          />
          <Button>Add to Cart</Button>
        </Col>
        <Col xs={12} md={6}>
          <div>{selectedGame.description}</div>
          <div>{selectedGame.price}</div>
          <div>{selectedGame.seller}</div>
          <div>{selectedGame.views}</div>
        </Col>
      </Row>
    </Container>
  );
}
