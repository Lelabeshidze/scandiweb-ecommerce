import React, { Component } from "react";
import styled from "styled-components";
import Header from "../../Layout/Header";

class CartComponent extends Component {
  constructor() {
    super();
    this.state = {
      setAttribute: [],
    };
  }

  handleAttribute = (e) => {
    this.setState({
      setAttribute: [...this.state.setAttribute, e.target.value],
    });
  };
  render() {
    const { cartItems, addToCart, removeFromCart } = this.props.cartItems;

    return (
      <div>
        <Header />
        {cartItems.length > 0 ? (
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
                          {attribute.name === "Color" ? (
                            <div style={{ display: "flex" }}>
                              {items.map((item) => {
                                return (
                                  <option
                                    key={item.id}
                                    name="attribute"
                                    value={`${item.value}`}
                                    style={{
                                      backgroundColor: `${item.value}`,
                                      width: "20px",
                                      height: "20px",
                                      display: "flex",
                                      borderStyle: "groove",
                                      margin: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={this.handleAttribute.bind(this)}
                                  ></option>
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ display: "flex" }}>
                              {items.map((item) => {
                                return (
                                  <option
                                    name="attribute"
                                    value={`${item.value}`}
                                    key={item.id}
                                    style={{
                                      textAlign: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "40px",
                                      height: "20px",
                                      borderStyle: "groove",
                                      margin: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={this.handleAttribute.bind(this)}
                                  >
                                    {item.value}
                                  </option>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <Button onClick={() => removeFromCart(item)}>-</Button>
                  <Button onClick={() => addToCart(item)}>+</Button>
                </SingleProduct>
              ) : (
                ""
              );
            })}
          </div>
        ) : (
          <div>The cart is empty</div>
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
const Button = styled.button`
  height: 30px;
  width: 30px;
  text-align: center;
`;

export default CartComponent;
