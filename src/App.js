import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleProductComponent from "./Components/ProductComponent/SingleProductComponent";
import { GET_PRODUCTS_BY_CATEGORIES } from "./GraphQL/dataQueries";
import { getAllProducts } from "./GraphQL/getAllCategory";
import Cart from "./Pages/Cart";
import CategoryPage from "./Pages/CategoryPage";
import ClothesPage from "./Pages/ClothesPage";
import TechPage from "./Pages/TechPage";


class App extends Component {
  render() {
   

    return (
      <div>
        <Routes>
          <Route path="/" element={<CategoryPage categoryName="all" />} />
          <Route path="/all" element={<Navigate to="/" />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/clothes" element={<ClothesPage />} />

          <Route
            path="/:productId/description"
            element={<SingleProductComponent />}
          />
          <Route
            path="/clothes/:productId/description"
            element={<SingleProductComponent />}
          />
          <Route
            path="/tech/:productId/description"
            element={<SingleProductComponent />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default getAllProducts(App, GET_PRODUCTS_BY_CATEGORIES);
