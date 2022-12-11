import React, { Component } from "react";
import CartComponent from "../Components/Cart/CartComponent";
import CartContext from "../Components/Cart/CartContext";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.products = props.cartItems;
  }
  render() {
    return (
      <div>
        <CartContext.Consumer>
          {(cartItems) => <CartComponent cartItems={cartItems} />}
        </CartContext.Consumer>
      </div>
    );
  }
}

export default Cart;
