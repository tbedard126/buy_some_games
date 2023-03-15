//imports
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "./components/Container";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import ReactDOM from "react-dom";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Header />
        <Container />
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default App;
