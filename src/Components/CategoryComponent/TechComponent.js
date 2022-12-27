import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  GET_PRODUCTS_BY_CATEGORIES,
  GET_TECH_PRODUCTS,
} from "../../GraphQL/dataQueries";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import { getData } from "../../GraphQL/getData";
import Header from "../../Layout/Header";
import CurrencyContext from "../../Utils/CurrencyContext";
import { withRouter } from "../../Utils/withRouter";
import ProductItem from "../ProductItem/ProductItem";

class TechComponent extends Component {
  static contextType = CurrencyContext;
  render() {
    const { data } = this.props;
    const { selectCurrency } = this.context;
    const { params } = this.props;
    // const tech = data.filter((name) => name === categoryName.name);

    if (data) {
      if (!data.category)
        return <h1 className="error-message">Category not found</h1>;
      const { products } = data.category;

      return (
        <>
          <Header />
          <Title>{data?.category?.name}</Title>
          <ProductContainer>
            {products.map((product, index) => {
              const { prices } = product;
              return (
                <Link to={`${product.id}/description`} key={index}>
                  <SingleProduct key={index}>
                    <img src={product.gallery[0]} alt="img" />
                    <p>{product.name}</p>
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
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
`;
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
`;
export default withRouter(getData(TechComponent, GET_TECH_PRODUCTS));
