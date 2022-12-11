import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartComponent from "./Components/Cart/CartComponent";
import CartContext, { CartProvider } from "./Components/Cart/CartContext";
import SingleProductComponent from "./Components/ProductComponent/SingleProductComponent";
import Cart from "./Pages/Cart";
import CategoryPage from "./Pages/CategoryPage";
import ClothesPage from "./Pages/ClothesPage";
import TechPage from "./Pages/TechPage";

class App extends Component {
  render() {
    const { data } = this.props;
    console.log(this.props);
    return (
      <div>
        <CartProvider>
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
        </CartProvider>
      </div>
    );
  }
}

export default App;
