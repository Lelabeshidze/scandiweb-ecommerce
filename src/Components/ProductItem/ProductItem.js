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
  render() {
    const { data } = this.props;
    const { selectCurrency } = this.context;

    const { products } = data.category;

    return (
      <>
        {products?.map((product, index) => {
          const { prices } = product;

          return (
            <Link to={`${product.id}/description`} key={index}>
              <SingleProduct>
                <img src={product.gallery[0]} alt="img" />
                <p>{product.name}</p>
                <CartIcon>
                  <img src={Cart} alt="cart" />
                </CartIcon>
                <h4>
                  {prices?.map((price, index) => {
                    return (
                      <div key={index}>
                        {price.currency.label === selectCurrency ? (
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
                {!selectCurrency && (
                  <div style={{ display: "inline", marginLeft: "10px" }}>
                    <span>{prices[0].currency.symbol}</span>
                    <span>{prices[0].amount}</span>
                  </div>
                )}
              </SingleProduct>
            </Link>
          );
        })}
      </>
    );
  }
}

const SingleProduct = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  div img {
    display: none;
  }
  img {
    width: 95%;
    height: 330px;
    object-fit: cover;
    align-self: center;
    align-self: center;
  }
  h4 {
    margin-top: 10px;
    margin-left: 10px;
  }
  p {
    margin-top: 20px;
    margin-left: 10px;
  }
  &&:hover {
    transition: all 300ms ease;
    box-shadow: 0 2rem 2rem 2rem rgba(132, 139, 200, 0.18);
  }
  &&:hover div img {
    display: block;
    transition: 0.3s;
    
  }
`;
const CartIcon = styled.div`
  img {
    position: absolute;
    top: 80%;
    left: 90%;
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
  }
`;

export default getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES);
