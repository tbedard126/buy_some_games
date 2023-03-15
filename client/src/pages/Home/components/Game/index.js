import React, { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../../../graphql/queries";

export default function GameCard() {
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>You fucked something up</p>;

  return (
    <div>
      <h1>Video Games</h1>
      <CardGroup>
        {data.games.map((games) => (
          <Card key={games._id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={games.imgUrl} />
            <Card.Body>
              <Card.Title>{games.imgUrl}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
