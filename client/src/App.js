// package imports
import React from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// top-level component imports
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar"; // maybe put this inside header -- either way itll stay out of 'container' class
// import Cart from "./components/Cart" // not yet implemented -- we will want this inside Navbar, most likely

// page imports
import Home from "./pages/Home";
import Game from "./pages/Game";
import Seller from "./pages/Seller";
// import Login from "./pages/Login";  // not yet added
// import Signup from "./pages/Game";  // not yet added

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh"> {/* make sure these classes match bootsraps classes name for the same functionality */}
            <Header />
            <Navbar />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/games/:gameId"
                  element={<Game />}
                />
                <Route
                  // path="/users/:userId"
                  path="/users"
                  element={<Seller />}
                />
                {/* The following 2 routes are not implemented yet*/}
                {/* <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              /> */}
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
