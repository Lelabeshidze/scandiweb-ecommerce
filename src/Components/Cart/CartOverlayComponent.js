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
      console.log(this.modalRef.current);
      console.log(event.target);
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
        <>
          <img src={Cart} alt="logo" onClick={this.handleClick} />
        </>
        {this.state.showModal && (
          <Modal>
            <CartContainer>
              <CartContent>
                <h3>My bag: {totalAmount} items</h3>
                {cartItems.length > 0 ? (
                  <div>
                    {cartItems?.map((item, index) => {
                      const { attributes } = item;
                      const { prices } = item;
                      const { name } = item;
                      return item.count > 0 ? (
                        <SingleProduct key={index}>
                          <div>
                            <p>{name}</p>
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
                            </div>
                          </div>
                          <Actions>
                            <Button onClick={() => addToCart(item)}>+</Button>
                            <p>{item.count}</p>
                            <Button onClick={() => removeFromCart(item)}>
                              -
                            </Button>
                          </Actions>
                          <div>
                            <img src={item.gallery[0]} alt="photo" />
                          </div>
                        </SingleProduct>
                      ) : (
                        ""
                      );
                    })}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
              </CartContent>
            </CartContainer>
          </Modal>
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
const Modal = styled.div`
  width: 2000px;
  height: 2000px;
  position: absolute;
  z-index: 1;
  right: 0px;
  background: rgba(57, 55, 72, 0.3);
`;
const CartContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 400px;
  right: 20px;
  background-color: white;
  h3 {
    margin-top: 20px;
  }
`;
const CartContent = styled.div`
  width: 100%;
`;
const SingleProduct = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  img {
    width: 70%;
    object-fit: contain;
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
