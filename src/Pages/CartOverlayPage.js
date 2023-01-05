import React, { Component } from "react";
import CartOverlayComponent from "../Components/Cart/CartOverlayComponent";
import CartContext from "../Utils/CartContext";
import CurrencyContext from "../Utils/CurrencyContext";

class CartOverlayPage extends Component {
  render() {
    return (
      <div>
        <CurrencyContext.Consumer>
          {(currency) => (
            <CartContext.Consumer>
              {(cartItems, setAttribute) => (
                <CartOverlayComponent
                  currency={currency}
                  cartItems={cartItems}
                
                />
              )}
            </CartContext.Consumer>
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}

export default CartOverlayPage;
