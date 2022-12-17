import React, { Component } from "react";
import styled from "styled-components";
import Header from "../../Layout/Header";
import SingleProductComponent from "../ProductComponent/SingleProductComponent";

class CartComponent extends Component {
  render() {
    const { cartItems, addToCart, removeFromCart } = this.props.cartItems;

    return (
      <div>
        <Header />
        {cartItems.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div>
            {cartItems?.map((item, index) => {
              const { attributes } = item;

              return item.count > 0 ? (
                <SingleProduct key={index}>
                  <img src={item.gallery[0]} alt="photo" />
                  <p>{item.count}</p>
                  <div>
                    {attributes.map((attribute, index) => {
                      const { name, type, items } = attribute;
                      return (
                        <div key={index}>
                          <h3>{name}</h3>
                          <div>
                            {items.map((item) => {
                              return (
                                <div key={item.id}>{item.displayValue}</div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                </SingleProduct>
              ) : (
                ""
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
const SingleProduct = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  margin-top: 90px;
  img {
    width: 70%;

    object-fit: cover;
  }
`;

export default CartComponent;
