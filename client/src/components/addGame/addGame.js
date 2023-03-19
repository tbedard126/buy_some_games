import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_GAME } from "../../graphql/mutations";
import Auth from "../../auth/auth";

const AddGame = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [addGame] = useMutation(ADD_GAME);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = parseFloat(event.target.price.value);
    const category = event.target.category.value;
    const { data } = addGame({
      variables: {
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
      <span className="nav-btn m-2"  onClick={() => setShowModal(true)}>
        Add Game
      </span >

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

export default AddGame;
