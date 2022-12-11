import React, { Component } from "react";
import Header from "../../Layout/Header";
import SingleProductComponent from "../ProductComponent/SingleProductComponent";

class CartComponent extends Component {
  render() {
    const { cartItems } = this.props.cartItems;
   
    return (
      <div>
        <Header/>
        {cartItems.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div>
            {cartItems?.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.gallery[0]} alt="photo" />
                  <p>{item.count}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default CartComponent;
