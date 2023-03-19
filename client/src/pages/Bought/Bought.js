import React from "react";

export default function Bought() {
  
  const cartArray = JSON.parse(localStorage.getItem("cartItems"));

  let total = 0;
  for (const game of cartArray) {
    total += game.price
  }

  return (
    <div className="w-50 rounded bg-dark text-white mx-auto">
      <h1>Your Order:</h1>
      <ul>
        {cartArray.map(game => {
          <li key={game.name} className="m-2">
            <span>{game.name}</span>
            <span style={{float: "right"}}>${game.price}</span>
          </li>
        })}
      </ul>
      <p className="text-center">Total: {total}</p>
    </div>
  );
}