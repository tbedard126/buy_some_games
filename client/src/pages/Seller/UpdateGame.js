import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_GAME } from "../../graphql/mutations";
import Auth from "../../auth/auth";

export default function UpdateGame({ gameId, name, description, price, category }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [updateGame] = useMutation(UPDATE_GAME);

  const selectConsoles = [
    "Nintendo",
    "Super Nintendo",
    "Sega Genesis",
    "Nintendo 64"
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = parseFloat(event.target.price.value);
    const category = event.target.category.value;
    const { data } = updateGame({
      variables: {
        id: gameId,
        name: name,
        description: description,
        price: price,
        category: category,
        seller: Auth.getProfile().data._id,
      },
    })
      .then(() => {
        console.log(data);
        handleClose();
      })
      .catch((error) => {
        console.log(data);
        console.error(error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Update Game
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} placeholder="Enter game name" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                placeholder="Enter game description"
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={price}
                placeholder="Enter game price"
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                {/* <option>Super Nintendo</option>
                <option>Nintendo 64</option>
                <option>Sega Genesis</option>
                <option>Nintendo</option> */}
                {selectConsoles.map((option) => {
                  if (option === category) {
                    return <option selected>{option}</option>
                  } else {
                    return <option>{option}</option>
                  }
                })};
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Game
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};


