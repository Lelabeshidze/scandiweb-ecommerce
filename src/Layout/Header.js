import React, { Component } from "react";
import Logo from "../Assets/logo.svg";
import Cart from "../Assets/cart.svg";
import styled from "styled-components";
import "../App.css";
import { getData } from "../GraphQL/getData";
import { GET_CATEGORIES, GET_CURRENCIES } from "../GraphQL/dataQueries";
import Navigation from "./Navigation";
class Header extends Component {
  render() {
    const { data } = this.props;

    if (data) {
      return (
        <HeaderContainer className="header">
          <Navigation />
          <img src={Logo} alt="logo" />
          <div className="actions">
            {data?.currencies?.map((currency, index) => {
              return (
                <div key={index}>
                  {currency.label}
                  {currency.symbol}
                </div>
              );
            })}

            <img src={Cart} alt="logo" />
          </div>
        </HeaderContainer>
      );
    }
  }
}
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .actions {
    display: flex;
  }
`;
export default getData(Header, GET_CURRENCIES);
