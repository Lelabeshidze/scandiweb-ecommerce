import React, { Component, createRef } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartLogo from "../../Assets/cart.svg";
import CurrencyContext from "../../Utils/CurrencyContext";
import Cart from "../../Pages/Cart";

class CartOverlayComponent extends Component {
  static contextType = CurrencyContext;
  constructor() {
    super();
    this.state = {
      showModal: false,
      menuOpen: false,
      setAttribute: [],
    };
  }
  handleAttribute = (e) => {
    this.setState({
      setAttribute: [...this.state.setAttribute, e.target.value],
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

    const { selectedCurrency } = this.context;

    if (this.state.showModal) {
      document.getElementById("root").classList.add("Overlay");
    } else {
      document.getElementById("root").classList.remove("Overlay");
    }
    return (
      <>
        <Container ref={this.modalRef}>
          <CartIcon>
            <img src={CartLogo} alt="logo" onClick={this.handleClick} />
            <span>{totalAmount}</span>
          </CartIcon>

          {this.state.showModal && (
            <CartContainer>
              <CartContent>
                <h3>My bag: {totalAmount} items</h3>
                {cartItems.length > 0 ? (
                  <div>
                    {cartItems?.map((item, index) => {
                      const { attributes } = item;
                      const { prices } = item;
                      const { name } = item;
                      const keys = Object.keys(item.selectedAttribute);

                      return item.count > 0 ? (


                        <SingleProduct key={index}>
                          <div className="ItemDesc">
                            <p>{name}</p>
                            <h4>
                              {prices?.map((price, index) => {
                                return (
                                  <div key={index}>
                                    {price.currency.label === selectedCurrency ? (
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
                            {!selectedCurrency && (
                              <>
                                <span>{prices[0].currency.symbol}</span>
                                <span>{prices[0].amount}</span>
                              </>
                            )}

                            <ul style={{ display: "flex" }}>
                              {keys.map((attributeKey, index) => {
                                const { value, displayValue } =
                                  item.selectedAttribute[attributeKey];
                                const swatchAttribute =
                                  attributeKey === "Color" ? value : "black";

                                return (
                                  <li
                                    key={index}
                                    style={{
                                      backgroundColor: swatchAttribute,
                                      textAlign: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "60px",
                                      height: "30px",
                                      marginTop: "10px",
                                      marginRight: "10px",
                                      cursor: "pointer",
                                      border: "1px solid",
                                    }}
                                  >
                                    {attributeKey !== "Color" && (
                                      <span style={{
                                        color: "white"
                                      }}>{value}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
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
          )}
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
`;

const CartContainer = styled.div`
  display: block;
  position: absolute;
  z-index: 2;
  width: 450px;
  right: 60px;
  background-color: white;
  h3 {
    margin-top: 20px;
    margin-left: 15px;
    font-weight: 700;
    display: flex;
    
  }
`;
const CartContent = styled.div`
  position: absolute;
  width: 100%;

  background-color: white;
  z-index: 1;
  right: 50px;
  font-size: 14px;
  overflow: scroll;
  height: 400px;
  font-weight: 800;
`;
const SingleProduct = styled.div`
  background-color: white;
  margin-top: 50px;
  margin-left: 15px;
  display: flex;

  img {
    width: 100px;
    height: 100%;
    object-fit: cover;
  }
  justify-content: space-between;
  .ItemDesc{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding:10px;
    font-size:18px;
    h4{
      padding-top: 10px;
    }
   
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
  font-size: 20px;
  background-color: white;
  border: 1px solid;
  cursor: pointer;
  &&:hover {
    background: black;
    color: white;
    transition: all 300ms ease;
  }
`;
const CheckOut = styled.button`
  width: 140px;
  height: 40px;
  background-color: #5ece7b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;
const ViewBag = styled.button`
  width: 140px;
  height: 40px;
  background-color: white;
  border: solid 1px;
  cursor: pointer;
  margin: 5px;
  font-size: 18px;
  font-weight: 600;
`;
const CartIcon = styled.div`
  position: relative;
  img {
    width: 30px;
    height: 30px;
  }
  cursor: pointer;
  span {
    position: absolute;
    left: 18px;
    bottom: 18px;
    background: black;
    color: white;
    width: 28px;
    height: 28px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 800;
  }
`;
export default CartOverlayComponent;
