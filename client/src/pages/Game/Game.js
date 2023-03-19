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

  const handleAdd = (event) => {
    const cartArray = JSON.parse(localStorage.getItem("cartItems"));
    const gameObj = {
      id: selectedGame._id,
      name: selectedGame.name,
      price: selectedGame.price,
    };
    if (!cartArray) {
      localStorage.setItem("cartItems", JSON.stringify([gameObj]));
    } else {
      for (let game of cartArray) {
        if (game.name === gameObj.name) {
          alert(`Dude that's already in your cart`);
          return;
        }
      }
      cartArray.push(gameObj);
      localStorage.setItem("cartItems", JSON.stringify(cartArray));
    }
  };

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Container>
      <div className="gameTitle">
        <h1 className="gameTitle">{selectedGame.name}</h1>
      </div>

      <Row>
        <Col xs={12} md={6}>
          <Image
            className="zoom imgDisplay"
            src={selectedGame.imgUrl}
            alt={selectedGame.name}
            fluid
          />
        </Col>
        <Col xs={12} md={6} className="gameInfo">
          <div className="gameDescContainer">
            <h4 className="gameDesc">Description:</h4>
            <p className="gameDesc">{selectedGame.description}</p>
          </div>
          <div className="gameSaleInfo">
            <span className="gameSaleInfo">Price: ${selectedGame.price}</span>
            <span className="gameSaleInfo">
              Seller: {selectedGame.seller.username}
            </span>
            <span className="gameSaleInfo">Views: {selectedGame.views}</span>
          </div>
          <div className="addCartBtn">
            <Button className="addToCart" onClick={handleAdd}>
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
