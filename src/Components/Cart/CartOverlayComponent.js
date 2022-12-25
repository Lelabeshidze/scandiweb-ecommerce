import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cart from "../../Assets/cart.svg";
import CurrencyContext from "../../Utils/CurrencyContext";

class CartOverlayComponent extends Component {
  static contextType = CurrencyContext;
  constructor() {
    super();
    this.state = {
      showModal: false,
      menuOpen: false,
      setAsstribute: [],
    };
  }
  handleAttribute = (e) => {
    this.setState({
      setAsstribute: [...this.state.setAsstribute, e.target.value],
    });
  };
  modalRef = createRef();

  handleClick = (event) => {
    event.preventDefault();

    this.setState(
      (prevState) => ({ showModal: !prevState.showModal }),
      () => {
        document.addEventListener("click", this.closeMenu);
      }
    );
  };

  closeMenu = (event) => {
    if (this.modalRef.current && this.modalRef.current.contains(event.target)) {
      return;
    }
    this.setState({ showModal: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  render() {
    const { cartItems, addToCart, removeFromCart, totalAmount } =
      this.props.cartItems;
    const { selectCurrency } = this.context;

    return (
      <Container ref={this.modalRef}>
        <img src={Cart} alt="logo" onClick={this.handleClick} />
        {this.state.showModal && (
          <CartContainer>
            <p>My bag: {totalAmount} items</p>
            {cartItems.length > 0 ? (
              <div>
                {cartItems?.map((item, index) => {
                  const { attributes } = item;
                  const { prices } = item;
                  return item.count > 0 ? (
                    <SingleProduct key={index}>
                      <div>
                        {attributes.map((attribute, index) => {
                          const { name, type, items } = attribute;

                          return (
                            <div key={index}>
                              <h3>{name}</h3>
                              {attribute.name === "Color" ? (
                                <div style={{ display: "flex" }}>
                                  {items.map((item) => {
                                    return (
                                      <option
                                        key={item.id}
                                        name="attribute"
                                        value={`${item.value}`}
                                        style={{
                                          backgroundColor: `${item.value}`,
                                          width: "20px",
                                          height: "20px",
                                          display: "flex",
                                          borderStyle: "groove",
                                          margin: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={this.handleAttribute.bind(
                                          this
                                        )}
                                      ></option>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div style={{ display: "flex" }}>
                                  {items.map((item) => {
                                    return (
                                      <option
                                        name="attribute"
                                        value={`${item.value}`}
                                        key={item.id}
                                        style={{
                                          textAlign: "center",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "40px",
                                          height: "20px",
                                          borderStyle: "groove",
                                          margin: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={this.handleAttribute.bind(
                                          this
                                        )}
                                      >
                                        {item.value}
                                      </option>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
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
                      </div>
                      <Actions>
                        <Button onClick={() => addToCart(item)}>+</Button>
                        <p>{item.count}</p>
                        <Button onClick={() => removeFromCart(item)}>-</Button>
                      </Actions>
                      <img src={item.gallery[0]} alt="photo" />
                    </SingleProduct>
                  ) : (
                    ""
                  );
                })}

                <div>
                  <Link to="/cart">
                    <ViewBag>View Bag</ViewBag>
                  </Link>
                  <Link to="/">
                    <CheckOut>CHECK OUT</CheckOut>
                  </Link>
                </div>
              </div>
            ) : (
              <div>The cart is empty</div>
            )}
          </CartContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const CartContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 400px;
  right: 10px;
  background-color: white;
`;
const SingleProduct = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  img {
    width: 50%;
    object-fit: cover;
  }
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  height: 30px;
  width: 30px;
  text-align: center;
`;
const CheckOut = styled.button`
  width: 140px;
  height: 40px;
  background-color: #5ece7b;
  color: white;
  border: none;
  cursor: pointer;
`;
const ViewBag = styled.button`
  width: 140px;
  height: 40px;
  background-color: white;
  border: solid 1px;
  cursor: pointer;
  margin: 5px;
`;
export default CartOverlayComponent;
