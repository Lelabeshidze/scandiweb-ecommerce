import React, { Component } from "react";
import { GET_PRODUCT } from "../../GraphQL/dataQueries";
import { getProductById } from "../../GraphQL/getProduct";
import { withRouter } from "../../Utils/withRouter";
import ProductItem from "../ProductItem/ProductItem";
import Header from "../../Layout/Header";
import CartContext from "../../Utils/CartContext";
import styled from "styled-components";
import DOMPurify from "dompurify";

class SingleProductComponent extends Component {
  static contextType = CartContext;
  render() {
    const { params } = this.props;
    const { data } = this.props;
    const { cartItems, addToCart } = this.context;

    return (
      <div>
        <Header />
        <SingleProduct>
          <div>
            <img src={data?.product?.gallery[0]} alt="picture" />
            <img src={data?.product?.gallery[1]} alt="picture" />
            <img src={data?.product?.gallery[2]} alt="picture" />
            <img src={data?.product?.gallery[3]} alt="picture" />
          </div>
          <div>
            <h3>{data?.product?.name}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.product?.description),
              }}
            />
            {data?.product?.attributes.map((attribute, index) => {
              const { name, type, items } = attribute;
              return (
                <div key={index}>
                  <h3>{name}</h3>
                  <div>
                    {items.map((item) => {
                      return <div key={item.id}>{item.displayValue}</div>;
                    })}
                  </div>
                </div>
              );
            })}
            <button onClick={() => addToCart(data?.product)}>
              Add to cart
            </button>
          </div>
        </SingleProduct>
      </div>
    );
  }
}
const SingleProduct = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
  img {
    width: fit-content;
    height: 511px;
  }
`;
export default withRouter(getProductById(SingleProductComponent, GET_PRODUCT));
