import React, { Component } from "react";
import CartComponent from "../Components/Cart/CartComponent";
import CartContext from "../Utils/CartContext";
import CurrencyContext from "../Utils/CurrencyContext";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.products = props.cartItems;
  }
  render() {
    return (
      <div>
        <CurrencyContext.Consumer>
          {(currency) => (
            <CartContext.Consumer>
              {(cartItems) => (
                <CartComponent currency={currency} cartItems={cartItems} />
              )}
            </CartContext.Consumer>
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}

export default Cart;
