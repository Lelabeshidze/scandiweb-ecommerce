import React, { Component } from "react";

class CartComponent extends Component {
  render() {
    const { cartItems } = this.props;
    console.log(this.props)
    return (
      <div>
        {cartItems.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div>You have {cartItems.length}</div>
        )}
      </div>
    );
  }
}

export default CartComponent;
