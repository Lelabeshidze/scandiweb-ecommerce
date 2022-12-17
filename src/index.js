import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { client } from "./GraphQL/apolloClient";
import { CartProvider } from "./Utils/CartContext";
import { CurrencyProvider } from "./Utils/CurrencyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CurrencyProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CurrencyProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
