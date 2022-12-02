import React, { Component } from "react";
import { GET_PRODUCTS_BY_CATEGORIES } from "../GraphQL/dataQueries";
import { getAllProducts } from "../GraphQL/getAllCategory";
import Header from "../Layout/Header";

class CategoryComponent extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default getAllProducts(CategoryComponent, GET_PRODUCTS_BY_CATEGORIES);
