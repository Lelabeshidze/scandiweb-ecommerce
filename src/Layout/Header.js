import React, { Component } from "react";
import Logo from "../Assets/logo.svg";
import Cart from "../Assets/cart.svg";
import styled from "styled-components";
import "../App.css";
import { getData } from "../GraphQL/getData";
import { GET_CATEGORIES, GET_CURRENCIES } from "../GraphQL/dataQueries";
import Navigation from "./Navigation";
import CurrenciesComponent from "../Components/Currencies/CurrenciesComponent";
class Header extends Component {
  render() {
    return (
      <HeaderContainer className="header">
        <Navigation {...this.props} />
        <img src={Logo} alt="logo" />

        <CurrenciesComponent />
      </HeaderContainer>
    );
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
export default Header;
