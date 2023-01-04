import React, { Component, createContext } from "react";

const CartContext = createContext(true);
export class CartProvider extends Component {
  cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  state = {
    cartItems: this.cart,
    totalAmount: 0,
    setAttribute: [],
  };

  componentDidMount() {
    const totalAmount = this.calculateTotalAmount(this.cart);
    this.setState({ totalAmount: totalAmount });
  }
  handleAttribute = (e) => {
    this.setState({
      setAttribute: [...this.state.setAttribute, e.target.value],
    });
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

    this.setState({ cartItems });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const totalAmount = this.calculateTotalAmount(cartItems);
    this.setState({ totalAmount: totalAmount });
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count--;
      }
    });

    this.setState({ cartItems });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const totalAmount = this.calculateTotalAmount(cartItems);
    this.setState({ totalAmount: totalAmount });
  };
  calculateTotalAmount = (updatedCart) => {
    let totalAmount = 0;
    updatedCart.forEach((product) => {
      totalAmount += product.count;
    });
    return totalAmount;
  };

  render() {
    const { children } = this.props;
    const { cartItems, totalAmount, setAttribute } = this.state;
    const changeAttribute = this.handleAttribute;
    const addToCart = this.addToCart;
    const removeFromCart = this.removeFromCart;
    return (
      <CartContext.Provider
        value={{
          addToCart,
          cartItems,
          totalAmount,
          removeFromCart,
          changeAttribute,
          setAttribute,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
