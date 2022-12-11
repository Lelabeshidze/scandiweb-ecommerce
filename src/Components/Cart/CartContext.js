import React, { Component, createContext } from "react";

const CartContext = createContext(true);
export class CartProvider extends Component {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  state = {
    cartItems: this.cart,
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.product?.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({ cartItems });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  render() {
    const { children } = this.props;
    const { cartItems } = this.state;
    const addToCart = this.addToCart;

    return (
      <CartContext.Provider
        value={{
          addToCart,
          cartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
