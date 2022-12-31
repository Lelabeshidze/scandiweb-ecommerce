import React, { Component } from "react";
import { GET_PRODUCT } from "../../GraphQL/dataQueries";
import { getProductById } from "../../GraphQL/getProduct";
import { withRouter } from "../../Utils/withRouter";

import Header from "../../Layout/Header";
import CartContext from "../../Utils/CartContext";
import styled from "styled-components";
import DOMPurify from "dompurify";

class SingleProductComponent extends Component {
  static contextType = CartContext;
  constructor() {
    super();
    this.state = {
      setAttribute: [],
      setPicture: [],
    };
  }

  handleAttribute = (e) => {
    this.setState({
      setAttribute: [...this.state.setAttribute, e.target.value],
    });
  };
  handlePicture = (e) => {
    this.setState({ setPicture: e });
    console.log(this.state.setPicture);
  };

  render() {
    const { data } = this.props;
    const { cartItems, addToCart } = this.context;
    // console.log(
    //   data?.product?.attributes.map((item) => console.log(item.type))
    // );
    const { setAttribute, handleAttribute } = this.props;
    // console.log(this.state.setPicture);
    return (
      <div>
        <Header />
        <SingleProduct>
          <div>
            <ul>
              {data?.product?.gallery.map((imageUrl, index) => {
                // console.log(imageUrl);
                return (
                  <li
                    key={index}
                    name="picture"
                    value={imageUrl}
                    onClick={() => this.handlePicture(imageUrl)}
                  >
                    <img src={imageUrl} alt={data?.product?.name} />
                  </li>
                );
              })}
            </ul>
            <div>
              <img src={this.state.setPicture} alt="product" />
            </div>
          </div>
          <div>
            <h3>{data?.product?.name}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.product?.description),
              }}
            />
            {data?.product?.attributes.map((attribute, index) => {
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
                              width: "30px",
                              height: "30px",
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
                              width: "45px",
                              height: "40px",
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
            {this.state.setAttribute.length === 0 ? (
              <ButtonDisabled onClick={() => addToCart(data?.product)} disabled>
                Select Attribute
              </ButtonDisabled>
            ) : (
              <Button onClick={() => addToCart(data?.product)}>
                Add to cart
              </Button>
            )}
          </div>
        </SingleProduct>
      </div>
    );
  }
}
const SingleProduct = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
`;
const Button = styled.button`
  width: 200px;
  height: 50px;
  background-color: #5ece7b;
  color: white;
  border: none;
  cursor: pointer;
`;
const ButtonDisabled = styled.button`
  width: 200px;
  height: 50px;
  background-color: grey;
  color: white;
  border: none;
  cursor: pointer;
`;
const MainImg = styled.img`
  width: 610px;
  height: 511px;
`;
export default withRouter(getProductById(SingleProductComponent, GET_PRODUCT));
