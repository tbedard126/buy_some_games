import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_GAME } from "../../graphql/mutations";

const AddGameModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [addGame] = useMutation(ADD_GAME);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = parseFloat(event.target.price.value);
    const category = event.target.category.value;
    addGame({
      variables: {
        name: name,
        description: description,
        price: price,
        category: category,
      },
    })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Game
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter game name" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter game description"
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter game price"
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option>Super Nintendo</option>
                <option>Nintendo 64</option>
                <option>Sega Genesis</option>
                <option>Nintendo</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Game
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddGameModal;
