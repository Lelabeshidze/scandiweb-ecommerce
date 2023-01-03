import React, { Component } from "react";
import styled from "styled-components";
import Header from "../../Layout/Header";
import DOMPurify from "dompurify";
import CurrencyContext from "../../Utils/CurrencyContext";
class CartComponent extends Component {
  static contextType = CurrencyContext;
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
    const { selectCurrency } = this.context;
    return (
      <div>
        <Header />
        <h2 style={{ marginTop: "40px" }}>CART</h2>

        {cartItems.length > 0 ? (
          <div>
            {cartItems?.map((item, index) => {
              const { attributes } = item;
              const { prices } = item;

              return item.count > 0 ? (
                <SingleProduct key={index}>
                  <div>
                    <div>
                      <h3>{item.name}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(item.description),
                        }}
                      ></p>
                      <h4>
                        {prices?.map((price, index) => {
                          return (
                            <div key={index}>
                              {price.currency.label === selectCurrency ? (
                                <>
                                  <span>{price.currency.symbol}</span>
                                  <span>{price.amount}</span>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </h4>
                      {!selectCurrency && (
                        <h4>
                          <span>{prices[0].currency.symbol}</span>
                          <span>{prices[0].amount}</span>
                        </h4>
                      )}
                    </div>
                    {attributes.map((attribute, index) => {
                      const { name, type, items } = attribute;

                      return (
                        <Container key={index}>
                          <div key={index}>
                            <h4 style={{ fontWeight: "600" }}>{name}</h4>
                            {attribute.name === "Color" ? (
                              <div style={{ display: "flex" }}>
                                {items.map((attributeItem) => {
                                  return (
                                    <option
                                      key={attributeItem.id}
                                      name="attribute"
                                      value={`${attributeItem.value}`}
                                      style={{
                                        backgroundColor: `${attributeItem.value}`,
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        margin: "5px",
                                        cursor: "pointer",
                                        border: "1px ",
                                      }}
                                      onClick={this.handleAttribute.bind(this)}
                                    ></option>
                                  );
                                })}
                              </div>
                            ) : (
                              <div style={{ display: "flex" }}>
                                {items.map((attributeItem) => {
                                  return (
                                    <option
                                      name="attribute"
                                      value={`${attributeItem.value}`}
                                      key={attributeItem.id}
                                      style={{
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "55px",
                                        height: "35px",
                                        margin: "5px",
                                        cursor: "pointer",
                                        border: "1px solid",
                                      }}
                                      onClick={this.handleAttribute.bind(this)}
                                    >
                                      {attributeItem.value}
                                    </option>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </Container>
                      );
                    })}
                  </div>
                  <Actions>
                    <div>
                      <Button onClick={() => removeFromCart(item)}>-</Button>
                      <p>{item.count}</p>
                      <Button onClick={() => addToCart(item)}>+</Button>
                    </div>
                    <img src={item.gallery[0]} alt="product" />
                  </Actions>
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

const Container = styled.div`
  div {
    margin-top: 10px;
  }
  option:hover {
    background: black;
    color: white;
    transition: all 300ms ease;
  }
`;
const SingleProduct = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 90px;
  img {
    width: 200px;
    height: 288px;
    object-fit: cover;
  }
  p {
    margin-top: 10px;
  }
  h4 {
    margin-top: 10px;
  }
`;
const Button = styled.button`
  height: 40px;
  width: 40px;
  text-align: center;
  background-color: white;
  border: 1px solid;
  cursor: pointer;
  &&:hover {
    background: black;
    color: white;
    transition: all 300ms ease;
  }
`;
const Actions = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    margin-right: 15px;
  }
`;
export default CartComponent;
