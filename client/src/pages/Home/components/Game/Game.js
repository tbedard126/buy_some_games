import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../../../graphql/queries";
import { INCREMENT_GAME_VIEWS } from "../../../../graphql/mutations";

export default function GameCard() {
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);
  const [incrementGameViews] = useMutation(INCREMENT_GAME_VIEWS);

  const clickAddView = (event) => {
    const gameId = event.target.parentElement.getAttribute('data-id');
    const gameViews = event.target.parentElement.getAttribute('data-views');
    const { data } = incrementGameViews({
      variables: {
        id: gameId,
        currViews: parseInt(gameViews)
      }
    });
  }

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
            <Card style={{ width: "18rem", height: "100%" }}>
              <Link to={`/games/${game._id}`} data-id={game._id} data-views={game.views} onClick={clickAddView}>
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
              </Link>
              <div className="cardbody">
                <div className="cardGameInfo">{game.name}</div>
                <div className="cardGameInfo">${game.price}</div>
                <div className="cardGameInfo">{game.category}</div>
                {/* <div className="cardGameInfo" hidden>{game.views}</div> */}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
