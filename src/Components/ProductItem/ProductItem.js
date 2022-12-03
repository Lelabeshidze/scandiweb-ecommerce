import { from } from "@apollo/client";
import React, { Component } from "react";
import { getProductById } from "../../GraphQL/getProduct";
import { GET_PRODUCTS_BY_CATEGORIES } from "../../GraphQL/dataQueries.js";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import styled from "styled-components";
class ProductItem extends Component {
  render() {
    const { data } = this.props;
    const { products } = data.category;
    console.log(products[0].prices[0].amount);
    // console.log(data.category.products);
    return (
      <div>
        {products?.map((product, index) => {
          return (
            <SingleProduct key={index}>
              <img src={product.gallery} alt="img" />
              <h3>{product.name}</h3>
              <h4>{product.prices.amount}</h4>
            </SingleProduct>
          );
        })}
      </div>
    );
  }
}

const SingleProduct = styled.div`
  max-width: 600px;
  width: 100%;
  img {
    width: 70%;
  }
`;

export default getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES);
