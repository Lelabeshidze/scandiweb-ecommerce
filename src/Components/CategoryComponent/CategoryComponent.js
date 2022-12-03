import React, { Component } from "react";
import styled from "styled-components";
import { GET_PRODUCTS_BY_CATEGORIES } from "../../GraphQL/dataQueries";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import Header from "../../Layout/Header";
import ProductItem from "../ProductItem/ProductItem";

class CategoryComponent extends Component {
  render() {
    const { data } = this.props;

    if (data) {
      if (!data.category)
        return <h1 className="error-message">Category not found</h1>;
      const { products } = data.category;

      return (
        <>
          <Header />
          <ProductContainer>
            {products.map((product) => {
              return <ProductItem key={product.id} />;
            })}
          </ProductContainer>
        </>
      );
    }
  }
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default getAllProducts(CategoryComponent, GET_PRODUCTS_BY_CATEGORIES);
