# React Portfolio
### A MERN stack app by Tyler Bedard, Noah Cote and Tyler Reimer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is an app which serves as a person-to-person used games store, with an initial focus on retro games. People looking to sell their old games can create an account and list them; people looking to find & buy these old used games can peruse the ones listed on the site, and buy them from the seller. Guest checkout is an option, therefore a user needn't create an account if they want to buy games.

## Table of Contents

- [Technologies Used](#technologies-used)
- [User Story](#user-story)
- [Usage](#usage)
- [Credits](#credits)
- [Contributors](#contributors)
- [License](#license)

## Technologies Used

  -NodeJS / Express
  -MongoDB / Mongoose
  -React
  -Apollo GraphQL
  -React-Bootstrap

## User Story

AS A retro video game player,  
I WANT a website to buy and sell games  
SO THAT I can find games I am looking for, and post games that I no longer want.  

## Usage

Upon visiting the site, you will land on the 'home' page where all of the games currently for sale are shown, along with their price. You can narrow your search to a specific console with the option bar on the left. There are currently games for four consoles -- NES, SNES, Sega Genesis, and Nintedo 64 -- consoles popular in the 1990s. If a game piques your interest, you can click on it and be brought to that game's specific page, where more detailed information is displayed -- a description (the condition of the game is very important for used games!), the seller, and the number of views it has received. You will have the option to add/remove games to a virtual cart, where you can purchase its contents. Once purchased, you will be shown a summary of your order. Anyone who chooses to buy from this site does not need to make an account, however, sellers do need to make one. If you are looking to sell games, create an account and you can begin listing them. You must include the game name, price and a category (console) -- while a description isn't required, it is strongly advised, considering used games will be in varying states of condition. On your personal seller page, you will have the option to update a game -- most likely the price or description -- you may want to lower a game's price or give a more detailed description if you find one of your games isn't selling. Here you can also choose to unlist a game if you change your mind about selling it. This is currently all the functionality we offer!

Link to live site: https://calm-peak-12756.herokuapp.com/
  
Screenshot(s):
![Home](./client/public/images/mockups/home-page.png?raw=true "Home page (view listed games)")
![Seller](./client/public/images/mockups/seller-page.png?raw=true "Seller profile page, regular screen")
![Seller Mobile](./client/public/images/mockups/seller-page-mobile.png?raw=true "Seller profile page, narrow screen")
![Game details](./client/public/images/mockups/one-game-page.png?raw=true "One game (details) page")
![Order](./client/public/images/mockups/completed-order.png?raw=true "Completed order page")


## Credits

Course exercises provide very good examples of how to use the newer technologies (React, GraphQL), and a _great_ boilerplate for all of the Auth functionality (Login/Signup and User model) -- those two things only needed to be slightly tweaked for our purposes.

## Contributors

Tyler Bedard -- Managing repo, seed file, Heroku deployment, React components, sounding board  
Noah Cote -- Styling, React components, wireframes/visual design  
Tyler Reimer -- Backend (GraphQL, resolvers), auth, troubleshooting  

## License

Covered under the MIT license.
