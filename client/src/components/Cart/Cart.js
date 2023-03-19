import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
// import { ADD_ORDER } from "../../graphql/mutations";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [addOrder] = useMutation(ADD_ORDER);

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
    });
    return total;
  }

  const handlePurchase = () => {
    const cartArray = getCartItems();
    if (cartArray) {
      const gameIds = [];
      cartArray.map(game => {
        gameIds.push(game.id);
      });

      const { data } = addOrder({
        variables: { gamesArr: gameIds },
      })
      .then(() => {
        console.log(data);
        localStorage.removeItem("cartItems");
        handleClose();
        window.location.assign("/");
      })
      .catch((error) => {
        console.error(error);
      })
    } else {
      alert(`Nothing to purchase. Don't ask me why the button is active though..`);
    }
  }

  const handleRemoveItem = (event) => {
    const gameName = event.target.parentElement.getAttribute('data-name');
    const cartArray = getCartItems();
    const newCartArray = cartArray.filter(game => game.name !== gameName);
    localStorage.setItem("cartItems", JSON.stringify(newCartArray));
    alert('Removed game from cart');
    handleClose();
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
                  <li key={game.name} className="m-3" data-name={game.name}>
                    <span>{game.name}</span>
                    <span>${game.price}</span>
                    <span className="bg-danger p-1 text-white rounded"
                      onClick={handleRemoveItem}
                      style={{ float: "right", cursor: "pointer" }}>Remove</span>
                  </li>
                )
              })}
          </ul>
          <p>Total: ${sumPrice()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}