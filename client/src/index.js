import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import ".//styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// leaving this commented out for now
// serviceWorker.register();
