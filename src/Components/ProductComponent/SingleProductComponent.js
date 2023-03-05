import React, { Component } from "react";
import { GET_PRODUCT } from "../../GraphQL/dataQueries";
import { getProductById } from "../../GraphQL/getProduct";
import { withRouter } from "../../Utils/withRouter";

import Header from "../../Layout/Header";
import CartContext from "../../Utils/CartContext";
import styled from "styled-components";
import DOMPurify from "dompurify";
import CurrencyContext from "../../Utils/CurrencyContext";

class SingleProductComponent extends Component {
  static contextType = CartContext;

  state = {
    setPicture: this.props.data?.product?.gallery[1],
  };

  handlePicture = (e) => {
    this.setState({ setPicture: e });
  };
  onAddToCart = () => {
    this.context.addToCart({
      ...this.props.data.product,
      selectedAttribute: this.context.setAttribute,
      selectedAttributeId: this.context.attributesId,
    });
  };
  render() {
    const { data, currency } = this.props;

    const { selectedCurrency } = currency;
    const { cartItems, addToCart, changeAttribute, setAttribute, selected, attributesId } =
      this.context;
    const objectKeys = Object.keys(setAttribute);
    const canAddToCart = this.props.data?.product.attributes.length === objectKeys.length;
    //  console.log(cartItems.map(item=> console.log(item.selectedAttribute.displayValue)))

    const objectValues = Object.values(setAttribute)
    // console.log(objectValues.map((itemof) => console.log(itemof.value)))
    // console.log(objectKeys)

    return (
      <div>
        <Header />
        <SingleProduct>
          <Carousel>
            <ul>
              {data?.product?.gallery.map((imageUrl, index) => {

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
              {this.state.setPicture ? (
                <img src={this.state.setPicture} alt="product" />
              ) : (
                <img src={`${data?.product?.gallery[0]}`} alt="" />
              )}
            </div>
          </Carousel>
          <ProductContent>
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
                  {type === "swatch" ? (
                    <div style={{ display: "flex" }}>
                      {items.map((item) => {
                        const { value, displayValue } = item;
                        const attributeSelected = setAttribute[name]?.displayValue === displayValue;
                        return (
                          <p
                            key={item.id}
                            name="attribute"
                            value={`${item.value}`}
                            className={attributeSelected ? "selected" : "unselected"}

                            style={{
                              backgroundColor: `${item.value}`,
                              // width: "30px",
                              // height: "30px",
                              // display: "flex",
                              // margin: "5px",
                              // cursor: "pointer",
                              // border: "1px ",
                              // fontWeight: "500",
                            }}

                            onClick={() =>
                              changeAttribute(attribute.name, {
                                value,
                                displayValue,
                              })
                            }
                          ></p>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      {items.map((item) => {
                        const { value, displayValue } = item;
                        const attributeSelected = setAttribute[name]?.displayValue === displayValue;

                        return (
                          <p
                            className={attributeSelected ? "selected" : "unselected"}

                            name="attribute"
                            value={`${item.value}`}
                            key={item.id}
                            // style={{
                            //   textAlign: "center",
                            //   display: "flex",
                            //   justifyContent: "center",
                            //   alignItems: "center",
                            //   width: "55px",
                            //   height: "35px",
                            //   margin: "5px",
                            //   cursor: "pointer",
                            //   border: "1px solid",
                            //   fontWeight: "800",
                            // }}
                            onClick={() =>
                              changeAttribute(attribute.name, {
                                value,
                                displayValue,
                              })
                            }
                          >
                            {item.value}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ fontWeight: "bold" }}>
              {selectedCurrency ? (
                data?.product?.prices?.map((price, index) => {
                  return (
                    <span key={index}>
                      {price.currency.label === selectedCurrency ? (
                        <>
                          <h3>PRICE:</h3>
                          <span>{price.currency.symbol}</span>
                          <span>{price.amount}</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  );
                })
              ) : (
                <>
                  <h3>PRICE:</h3>
                  <span>{data?.product?.prices[0].currency.symbol}</span>
                  <span>{data?.product?.prices[0].amount}</span>
                </>
              )}
            </div>

            {
              this.props.data?.product.inStock && !canAddToCart ? (
                <ButtonDisabled disabled>
                  Select Attribute
                </ButtonDisabled>
              ) : !this.props.data?.product.inStock ? <ButtonDisabled disabled>
                Out Of Stock
              </ButtonDisabled>
                : (
                  <Button onClick={() => this.onAddToCart(data?.product)}>
                    Add to cart
                  </Button>
                )}
          </ProductContent>
        </SingleProduct>
      </div>
    );
  }
}
const SingleProduct = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-top: 20px;
  
`;
const ButtonDisabled = styled.button`
  width: 200px;
  height: 50px;
  background-color: grey;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
const ProductContent = styled.div`
  width: 500px;
  div {
    padding-top: 15px;
    text-align: justify;
    p {
      margin-top: 10px;
  
    }
    h3 {
      margin-top: 15px;
    }
    li {
      padding-top: 15px;
     
    }
  }
  p:hover {
    background: black;
    color: white;
    transition: all 300ms ease;
  
  }
  p.selected{
    text-align: center;
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 35px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid;
    font-weight: 800;
    background-color:black;
    color:white;
  }
  p.unselected{
    text-align: center;
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 35px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid;
    font-weight: 800;
   
  }
`;
const Carousel = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px 100px;
  cursor: pointer;
  li img {
    width: 100px;
    height: 110px;
  }
  div img {
    width: 100%;
    height: 95%;
  }
`;
export default withRouter(getProductById(SingleProductComponent, GET_PRODUCT));
