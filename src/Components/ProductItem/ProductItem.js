import { from } from "@apollo/client";
import React, { Component } from "react";
import { getProductById } from "../../GraphQL/getProduct";
import { GET_PRODUCTS_BY_CATEGORIES } from "../../GraphQL/dataQueries.js";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import styled from "styled-components";
import { withRouter } from "../../Utils/withRouter";
import { Link } from "react-router-dom";
import SingleProductComponent from "../ProductComponent/SingleProductComponent";
class ProductItem extends Component {
  render() {
    const { data } = this.props;
    const { products } = data.category;

    return (
      <div>
        {products?.map((product, index) => {
          return (
            <Link to={`${this.props.product.id}/description`} key={index}>
              <SingleProduct product={this.props.product}>
                <img src={product.gallery[0]} alt="img" />
                <p>{product.name}</p>
                <h4>{product.prices.amount}</h4>
              </SingleProduct>
            </Link>
          );
        })}
      </div>
    );
  }
}

const SingleProduct = styled.div`
  max-width: 700px;
  width: 100%;
  margin-top: 90px;
  img {
    width: 80%;
  }
`;

export default withRouter(
  getAllProducts(ProductItem, GET_PRODUCTS_BY_CATEGORIES)
);
