import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_PRODUCTS_BY_CATEGORIES } from "../../GraphQL/dataQueries";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import Header from "../../Layout/Header";
import CurrencyContext from "../../Utils/CurrencyContext";
import { withRouter } from "../../Utils/withRouter";
import ProductItem from "../ProductItem/ProductItem";

class CategoryComponent extends Component {
  render() {
    const { data } = this.props;
   
    if (data) {
      if (!data.category)
        return <h1 className="error-message">Category not found</h1>;

      return (
        <>
          <Header />
          <Title>All Products</Title>
          <ProductContainer>
            <ProductItem />
          </ProductContainer>
        </>
      );
    }
  }
}

const ProductContainer = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 80px 40px;
  gap: 80px 40px;
`;
const Title = styled.h1`
  margin-top: 40px;
  text-transform: uppercase;
  font-weight: 300;
`;

export default getAllProducts(CategoryComponent, GET_PRODUCTS_BY_CATEGORIES);
