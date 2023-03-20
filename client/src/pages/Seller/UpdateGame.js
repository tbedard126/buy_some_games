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

  const enableButton = () => {
    const updateBtn = document.getElementById('confirm-update-btn');
    if (updateBtn.disabled) {
      updateBtn.disabled = false;
    }
  }

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
              <Form.Control type="text" defaultValue={name} placeholder="Enter game name" onChange={enableButton} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={description}
                placeholder="Enter game description"
                onChange={enableButton}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                defaultValue={price}
                placeholder="Enter game price"
                onChange={enableButton}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={enableButton}>
                {selectConsoles.map((option) => {
                  if (option === category) {
                    return <option selected>{option}</option>
                  } else {
                    return <option>{option}</option>
                  }
                })};
              </Form.Control>
            </Form.Group>

            <Button id="confirm-update-btn" variant="primary" type="submit" disabled>
              Update Game
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};


