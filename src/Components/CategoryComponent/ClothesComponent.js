import React, { Component } from "react";
import styled from "styled-components";
import { GET_CLOTHES_PRODUCTS } from "../../GraphQL/dataQueries";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import { getData } from "../../GraphQL/getData";
import Header from "../../Layout/Header";
import { withRouter } from "../../Utils/withRouter";
import ProductItem from "../ProductItem/ProductItem";

class ClothesComponent extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { data } = this.props;

    const { params } = this.props;
    // const tech = data.filter((name) => name === categoryName.name);

    if (data) {
      if (!data.category)
        return <h1 className="error-message">Category not found</h1>;
      const { products } = data.category;

      return (
        <>
          <Header />
          <ProductContainer>
            {products.map((product, index) => {
              return (
                <SingleProduct key={index}>
                  <img src={product.gallery[0]} alt="img" />
                  <p>{product.name}</p>
                  <h4>{product.prices.amount}</h4>
                </SingleProduct>
              );
            })}
          </ProductContainer>
        </>
      );
    }
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
const ProductContainer = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 80px 40px;
  gap: 80px 40px;
`;
export default withRouter(getData(ClothesComponent, GET_CLOTHES_PRODUCTS));
