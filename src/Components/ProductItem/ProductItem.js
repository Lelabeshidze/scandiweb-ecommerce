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
                  <>
                    <span>{prices[0].currency.symbol}</span>
                    <span>{prices[0].amount}</span>
                  </>
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
  margin-top: 90px;
  img {
    width: 70%;
    object-fit: cover;
  }
`;
const CartIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
`;

export default getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES);
