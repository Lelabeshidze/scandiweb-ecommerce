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
    console.log(products);
    // console.log(data.category.products);
    return (
      <div>
        {products?.map((product, index) => {
          return (
            <SingleProduct key={index}>
              <img src={product.gallery[0]} alt="img" />
              <p>{product.name}</p>
              <h4>{product.prices.amount}</h4>
            </SingleProduct>
          );
        })}
      </div>
    );
  }
}

const SingleProduct = styled.div`
  max-width: 700px;
  width: 100%;
  margin-top:90px;
  img {
    width: 80%;
  }
`;

export default getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES);
