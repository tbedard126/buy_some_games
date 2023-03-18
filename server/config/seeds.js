const db = require("./connection");
const { Game } = require("../models");
db.once("open", async () => {
  const games = await Game.insertMany([
    {
      name: "A Link to the Past",
      description: "A Link to the Past",
      imgUrl: "/images/a-link-to-the-past-snes.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Mario RPG",
      description: "Mario RPG",
      imgUrl: "/images/mario-rpg-snes.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Donkey Kong Country",
      description: "Donkey Kong Country",
      imgUrl: "/images/dk-country-snes.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Star Fox",
      description: "Star Fox",
      imgUrl: "/images/starfox-snes.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },

    {
      name: "Super Mario World",
      description: "Super Mario World",
      imgUrl: "/images/super-mario-snes.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Super Mario World 2 Yoshis Island",
      description: "Super Mario World 2 Yoshis Island",
      imgUrl: "/images/super-mario-world-2-yoshis-island.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Teenage Mutant Ninja Turtles Turtles in Time",
      description: "Teenage Mutant Ninja Turtles Turtles in Time",
      imgUrl: "/images/tmnt-turtles-in-time.jpg",
      price: 20,
      category: "Super Nintendo",
      // seller: "",
    },
    {
      name: "Excitebike",
      description: "Excitebike",
      imgUrl: "/images/Excitebike-nes.jpg",
      price: 20,
      category: "Nintendo",
      // seller: "",
    },
    {
      name: "Kirby's Adventure",
      description: "Kirby's Adventure",
      imgUrl: "/images/Kirby's-Adventure-nes.jpg",
      price: 20,
      category: "Nintendo",
      // seller: "",
    },
    {
      name: "MegaMan 2",
      description: "MegaMan 2",
      imgUrl: "/images/Mega-man-2.jpg",
      price: 20,
      category: "Nintendo",
      // seller: "",
    },
    {
      name: "Ducktales",
      description: "Ducktales",
      imgUrl: "/images/DuckTales-nes.jpg",
      price: 20,
      category: "Nintendo",
      // seller: "",
    },
    {
      name: "Super Mario Bros",
      description: "Super Mario Bros",
      imgUrl: "/images/Super-Mario-Bros-nes.jpg",
      price: 20,
      category: "Nintendo",
      // seller: "",
    },
    {
      name: "Earthworm Jim",
      description: "Earthworm Jim",
      imgUrl: "/images/Earthworm-Jim.jpg",
      price: 20,
      category: "Sega Genesis",
      // seller: "",
    },
    {
      name: "Sonic The Hedgehog",
      description: "Sonic The Hedgehog",
      imgUrl: "/images/sonic-sega.jpg",
      price: 20,
      category: "Sega Genesis",
      // seller: "",
    },
    {
      name: "Sonic The Hedgehog",
      description: "Sonic The Hedgehog",
      imgUrl: "/images/sonic-sega.jpg",
      price: 20,
      category: "Sega Genesis",
      // seller: "",
    },
    {
      name: "Sonic The Hedgehog 2",
      description: "Sonic The Hedgehog",
      imgUrl: "/images/sonic-2.jpg",
      price: 20,
      category: "Sega Genesis",
      // seller: "",
    },
    {
      name: "Aladdin",
      description: "Aladdin",
      imgUrl: "/images/Aladdin-sega.jpg",
      price: 20,
      category: "Sega Genesis",
      // seller: "",
    },
    {
      name: "Donkey Kong 64",
      description: "Donkey Kong 64",
      imgUrl: "/images/Donkey-Kong-64.jpg",
      price: 20,
      category: "Nintendo 64",
      // seller: "",
    },
    {
      name: "Banjo and Kazooie",
      description: "Banjo and Kazooie",
      imgUrl: "/images/Banjo-Kazooie.jpg",
      price: 20,
      category: "Nintendo 64",
      // seller: "",
    },
    {
      name: "Paper Mario",
      description: "Paper Mario",
      imgUrl: "/images/Paper-Mario-64.jpg",
      price: 20,
      category: "Nintendo 64",
      // seller: "",
    },
    {
      name: "Mario Kart 64",
      description: "Mario Kart 64",
      imgUrl: "/images/Mario-Kart-64.jpg",
      price: 20,
      category: "Nintendo 64",
      // seller: "",
    },
    {
      name: "Super Smash Bros",
      description: "Super Smash Bros",
      imgUrl: "/images/Super-Smash-Bros-64.jpg",
      price: 20,
      category: "Nintendo 64",
      // seller: "",
    },
  ]);
});
console.log("Games Seeded");
