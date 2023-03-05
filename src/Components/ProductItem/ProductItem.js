import { from } from "@apollo/client";
import React, { Component } from "react";

import { GET_PRODUCTS_BY_CATEGORIES } from "../../GraphQL/dataQueries.js";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import styled from "styled-components";
import { withRouter } from "../../Utils/withRouter";
import { Link } from "react-router-dom";
import Cart from "../../Assets/Circle Icon.svg";
import CurrencyContext from "../../Utils/CurrencyContext.js";

class ProductItem extends Component {
  static contextType = CurrencyContext;

  addToCart = (product) => {
    this.props.cartItems.addToCart({
      ...product,
      selectedAttribute: product.attributes[0]?.items[0],
    })

  }

  render() {
    const { data } = this.props;
    const { selectedCurrency } = this.context;
    const { addToCart } = this.props.cartItems

    const { products } = data.category;

    return (
      <>
        {products?.map((product, index) => {
          const { prices, inStock, attributes } = product;
          // console.log(attributes[0]?.items[0])
          return inStock ? (

            <SingleProduct id="Product" key={index}>
              <Link to={`${product.id}/description`}>
                <img src={product.gallery[0]} alt="img" />
              </Link>
              <p>{product.name}</p>
              <CartIcon onClick={() => this.addToCart(product)}>
                <img src={Cart} alt="cart" />
              </CartIcon>
              <h4>
                {prices?.map((price, index) => {
                  return (
                    <div key={index}>
                      {price.currency.label === selectedCurrency ? (

                        <span>{price.currency.symbol}{price.amount}</span>


                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </h4>
              {!selectedCurrency && (

                <span style={{ fontWeight: "1000", fontSize: "18px" }}>{prices[0].currency.symbol}{prices[0].amount}</span>


              )}
            </SingleProduct>

          ) : (
            <SingleProductOutStck key={index}>
              <Link to={`${product.id}/description`} key={index}>
                <img src={product.gallery[0]} alt="img" />
              </Link>
              <p>{product.name}</p>

              <h4>
                {prices?.map((price, index) => {
                  return (
                    <div key={index}>
                      {price.currency.label === selectedCurrency ? (
                        <div style={{ display: "inline" }}>
                          <span>{price.currency.symbol}</span>
                          <span>{price.amount}</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </h4>
              {!selectedCurrency && (
                <h4
                  style={{
                    display: "inline",

                  }}
                >
                  <span>{prices[0].currency.symbol}</span>
                  <span>{prices[0].amount}</span>
                </h4>
              )}
              <h3>OUT OF STOCK</h3>
            </SingleProductOutStck>
          );
        })}
      </>
    );
  }
}

const SingleProduct = styled.li`

  position: relative;
  width: 100%;
  padding: 16px;
  height: 444px;
  transition: 0.3s;
  div img {
    display: none;
  }
  img {
   
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
  h4 {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    
    margin-top: 24px;
    font-size: 18px;
  }
  &&:hover {
    transition: all 300ms ease;
    box-shadow: 0px 4px 15px rgba(168, 172, 176, 0.45);
  }
  &&:hover div img {
    display: block;
    transition: 0.3s;
  }
`;
const SingleProductOutStck = styled.div`
position: relative;
width: 100%;
height: 330px;
padding: 16px;
height: 444px;
transition: 0.3s;
  opacity: 0.5;
  h3 {
    position: absolute;
    top: 40%;
    left: 30%;
    transform: translate(-50%, -50%)
    font-size: 20px;
    font-weight:500;
  }
 
  img {
   
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
  h4 {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    
    margin-top: 24px;
    font-size: 18px;
  }

`;
const CartIcon = styled.div`
  img {
    position: absolute;
    top: 78%;
    left: 87%;
    width: 70px;
    height: 70px;
    transform: translate(-50%, -50%);
    cursor:pointer;
  }
`;

export default getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES);
