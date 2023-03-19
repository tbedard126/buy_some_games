import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCartItems = () => {
    const cartArray = JSON.parse(localStorage.getItem("cartItems"));
    return cartArray;
  }

  const sumPrice = () => {
    let total = 0;
    const cartArray = getCartItems();
    if (!cartArray) {
      return;
    }
    cartArray.map(game => {
      total += game.price;
      return total;
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Items in Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {!getCartItems() ? <p>No items in cart</p> : 
            getCartItems().map(game => {
              return (
              <li key={game.name}>
                <span>{game.name}</span>
                <span>${game.price}</span>                
              </li>
              );
            })}
          </ul>
          <p>Total: ${sumPrice()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Hide Cart
          </Button>
          <Button variant="success" onClick={handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}