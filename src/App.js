import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleProductComponent from "./Components/ProductComponent/SingleProductComponent";
import { GET_PRODUCTS_BY_CATEGORIES } from "./GraphQL/dataQueries";
import { getAllProducts } from "./GraphQL/getAllCategory";
import Cart from "./Pages/Cart";
import CategoryPage from "./Pages/CategoryPage";
import ClothesPage from "./Pages/ClothesPage";
import TechPage from "./Pages/TechPage";
import CurrencyContext from "./Utils/CurrencyContext";
import { withRouter } from "./Utils/withRouter";

class App extends Component {
  render() {

    return (
      <div>
        <CurrencyContext.Consumer>
          {(currency) => (
            <Routes >
              <Route path="/" element={<CategoryPage categoryName="all" />} />
              <Route path="/all" element={<Navigate to="/" />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/clothes" element={<ClothesPage />} />
              <Route path="/cart" element={<Cart />} />{" "}
              <Route
                path="/:productId/description"
                element={<SingleProductComponent currency={currency} />}
              />
              <Route
                path="/clothes/:productId/description"
                element={<SingleProductComponent currency={currency} />}
              />
              <Route
                path="/tech/:productId/description"
                element={<SingleProductComponent currency={currency} />}
              />
            </Routes>
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}

export default withRouter(getAllProducts(App, GET_PRODUCTS_BY_CATEGORIES));
