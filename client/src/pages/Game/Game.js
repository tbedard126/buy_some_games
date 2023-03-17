import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAME } from "../../graphql/queries";
import { Card, Row, Col } from "react-bootstrap";

export default function Game() {
  const { gameId } = useParams();
  const { loading, error, data } = useQuery(QUERY_GAME, {
    variables: {id: gameId}
  });
  const selectedGame = data?.game || {};
  console.log(selectedGame.imgUrl)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>{selectedGame.name}</h1>
      <div>
        <img src={selectedGame.imgUrl} alt={selectedGame.name}></img>
        <button>Add to Cart</button>
      </div>
      <div>
        <div>{selectedGame.description}</div>
        <div>{selectedGame.price}</div>
        <div>{selectedGame.seller}</div>
        <div>{selectedGame.views}</div>
      </div>
    </>
  );
}
