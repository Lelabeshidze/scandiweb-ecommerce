import React, { Component } from "react";
import Logo from "../Assets/logo.svg";
import Cart from "../Assets/cart.svg";
import styled from "styled-components";
import "../App.css";
import { getData } from "../GraphQL/getData";
import { GET_CATEGORIES, GET_CURRENCIES } from "../GraphQL/dataQueries";
class Header extends Component {
  render() {
    return (
      <HeaderContainer className="header">
        <nav>
          <ul className="navigation">
            <li style={{ paddingLeft: "10px" }}>WOMEN</li>
            <li style={{ paddingLeft: "10px" }}>MEN</li>
            <li style={{ paddingLeft: "10px" }}>KIDS</li>
          </ul>
        </nav>

        <img src={Logo} alt="logo" />

        <div className="actions">
          <div>Currencies</div>
          <img src={Cart} alt="logo" />
        </div>
      </HeaderContainer>
    );
  }
}
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .navigation {
    display: flex;
    text-decoration: none;
    list-style: none;
  }
  .actions {
    display: flex;
  }
`;
export default getData(Header, GET_CURRENCIES);
