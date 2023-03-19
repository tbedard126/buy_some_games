import React from "react";

export default function Bought() {
  
  const cartArray = JSON.parse(localStorage.getItem("cartItems"));

  if (!cartArray) {
    alert('Stop trying to break stuff. As puninshment, close this TWICE. Thanks, React')
    window.location.assign('/')
  }

  let total = 0;
  for (const game of cartArray) {
    total += game.price
  }

  localStorage.removeItem("cartItems");

  return (
    <div className="w-50 rounded bg-dark text-white mx-auto my-2">
      <h1 className="text-center">Your Order:</h1>
      <ul>
        {cartArray.map(game => {
          return (
          <li key={game.name} className="m-2">
            <span>{game.name}</span>
            <span style={{float: "right"}}>${game.price}</span>
          </li>
          )
        })}
      </ul>
      <p className="text-center">Total: ${total}</p>
    </div>
  );
}