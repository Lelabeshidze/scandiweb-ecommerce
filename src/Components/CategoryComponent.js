import React, { Component } from "react";
import { GET_PRODUCTS_BY_CATEGORIES } from "../GraphQL/dataQueries";
import { getAllProducts } from "../GraphQL/getAllCategory";
import Header from "../Layout/Header";

class CategoryComponent extends Component {
  render() {
    const { data, categoryName } = this.props;
    console.log(categoryName)
    if (data) {
      if (!data.category)
        return <h1 className="error-message">Category not found</h1>;
      const { products } = data.category;

      return (
        <>
          <Header />
          <div>
            <h1>{categoryName}</h1>
            <ul>
              {products.map((product) => {
                return <div key={product.id}> {product.name}</div>;
              })}
            </ul>
          </div>
        
        </>
      );
    }
  }
}

export default getAllProducts(CategoryComponent, GET_PRODUCTS_BY_CATEGORIES);
