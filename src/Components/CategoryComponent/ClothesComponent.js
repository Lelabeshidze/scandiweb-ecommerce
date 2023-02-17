import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_CLOTHES_PRODUCTS } from "../../GraphQL/dataQueries";
import { getAllProducts } from "../../GraphQL/getAllCategory";
import { getData } from "../../GraphQL/getData";
import Header from "../../Layout/Header";
import CurrencyContext from "../../Utils/CurrencyContext";
import Cart from "../../Assets/Circle Icon.svg";
class ClothesComponent extends Component {
  static contextType = CurrencyContext;
  addToCart = (product) => {
    this.props.cartItems.addToCart({
      ...product,
      selectedAttribute: product.attributes[0],

    })
  }
  render() {
    const { data } = this.props;
    const { selectCurrency } = this.context;
    const { addToCart } = this.props.cartItems
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
              const { prices, inStock } = product;
              return inStock ? (

                <SingleProduct key={index}>
                  <Link to={`${product.id}/description`} key={index}>
                    <img src={product.gallery[0]} alt="img" />
                  </Link>
                  <p>{product.name}</p>
                  <CartIcon onClick={() => this.addToCart(product)}>
                    <img src={Cart} alt="cart" />
                  </CartIcon>
                  <h4>
                    {prices?.map((price, index) => {
                      return (
                        <div key={index}>
                          {price.currency.label === selectCurrency ? (

                            <p style={{ display: "inline", fontWeight: "bold" }}>{price.currency.symbol}{price.amount}</p>

                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                  </h4>
                  {!selectCurrency && (

                    <p style={{ display: "inline" }}>{prices[0].currency.symbol}{prices[0].amount}</p>


                  )}
                </SingleProduct>

              ) : (
                <SingleProductOutStck key={index}>
                  <Link to={`${product.id}/description`} key={index}>
                    <img src={product.gallery[0]} alt="img" />
                  </Link>
                  <p>{product.name}</p>

                  <h4>
                    {prices?.map((price, index) => {
                      return (
                        <div key={index}>
                          {price.currency.label === selectCurrency ? (
                            <div style={{ display: "inline" }}>
                              <span>{price.currency.symbol}</span>
                              <span>{price.amount}</span>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                  </h4>
                  {!selectCurrency && (
                    <h4
                      style={{
                        display: "inline",
                        marginLeft: "10px",
                      }}
                    >
                      <span>{prices[0].currency.symbol}</span>
                      <span>{prices[0].amount}</span>
                    </h4>
                  )}
                  <h3>OUT OF STOCK</h3>
                </SingleProductOutStck>
              );
            })}
          </ProductContainer>
        </>
      );
    }
  }
}
const SingleProduct = styled.li`
position: relative;
width: 100%;
height: 330px;
padding: 16px;
height: 444px;
transition: 0.3s;

  div img {
    display: none;
  }
  img {
   
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
  h4 {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    
    margin-top: 24px;
    font-size: 18px;
    font-weight: bold;
  }
  &&:hover {
    transition: all 300ms ease;
    box-shadow: 0px 4px 15px rgba(168, 172, 176, 0.45);
  }
  &&:hover div img {
    display: block;
    transition: 0.3s;
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
  text-transform: capitalize;
  font-weight: 800;
`;
const SingleProductOutStck = styled.div`
position: relative;
width: 100%;
height: 330px;
padding: 16px;
height: 444px;
transition: 0.3s;
  opacity: 0.5;
  h3 {
    position: absolute;
    top: 40%;
    left: 30%;
    transform: translate(-50%, -50%)
    font-size: 20px;
    font-weight:500;
  }
 
  img {
   
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
  h4 {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    
    margin-top: 24px;
    font-size: 18px;
  }

`;
const CartIcon = styled.div`
  img {
    position: absolute;
    top: 80%;
    left: 90%;
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
    cursor:pointer;
  }
`;
export default getData(ClothesComponent, GET_CLOTHES_PRODUCTS);
