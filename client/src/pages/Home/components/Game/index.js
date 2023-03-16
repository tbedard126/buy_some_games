import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../../../graphql/queries";

export default function GameCard() {
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Games for sale!</h1>
      <Row xs={1} sm={2} md={3} className="g-4">
        {data.games.map((games) => (
          <Col key={games._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={games.imgUrl} />
              <Card.Body className="cardbody">
                <Card.Title>{games.name}</Card.Title>
                <Card.Text>{games.price}</Card.Text>
                <Card.Text>{games.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
