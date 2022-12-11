import React, { Component, createContext } from "react";

const CartContext = createContext(true);
export class CartProvider extends Component {
  state = {
    cartItems: [],
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState((prevState) => ({ ...prevState, cartItems }));
  };
  render() {
    const { children } = this.props;
    const { cartItems } = this.state;
    const  addToCart  = this.addToCart;
   
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
