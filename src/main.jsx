import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavouritesProvider } from "./context/FavouritesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavouritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavouritesProvider>
  </React.StrictMode>
);